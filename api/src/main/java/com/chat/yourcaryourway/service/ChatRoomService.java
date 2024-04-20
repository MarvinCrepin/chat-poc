package com.chat.yourcaryourway.service;


import com.chat.yourcaryourway.models.ChatRoom;
import com.chat.yourcaryourway.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public boolean isChatroomExist(Long chatId) {
        return chatRoomRepository.findOneByIdAndPendingTrue(chatId).isPresent();
    }
    public List<ChatRoom> getPendingChatRooms() {
        return chatRoomRepository.findByPendingTrue();
    }

    public ChatRoom createChatRoomIfNotPending(Long userId) {
        // Vérifier si l'utilisateur a déjà une chatroom en attente
        Optional<ChatRoom> existingPendingChatRoom = chatRoomRepository.findByUserIdAndPendingTrue(userId);

        // Si l'utilisateur a déjà une chatroom en attente, ne rien faire et retourner null
        if (existingPendingChatRoom.isPresent()) {
            return null;
        }

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUserId(userId);

        return chatRoomRepository.save(chatRoom);
    }

    public ChatRoom closeChatroom(Long chatId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findOneByIdAndPendingTrue(chatId);

        if (chatRoom.isEmpty()) {
            return null;
        }

        chatRoom.get().setPending(false);
        chatRoom.get().setEndDate(LocalDateTime.now());

        return chatRoomRepository.save(chatRoom.get());
    }
}