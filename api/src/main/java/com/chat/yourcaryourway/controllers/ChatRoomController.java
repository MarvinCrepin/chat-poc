package com.chat.yourcaryourway.controllers;

import com.chat.yourcaryourway.dto.CloseChatRoomRequest;
import com.chat.yourcaryourway.dto.CreateChatRoomRequest;
import com.chat.yourcaryourway.models.ChatRoom;
import com.chat.yourcaryourway.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(value = "/chatrooms")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @GetMapping
    public List<ChatRoom> getPendingChatrooms() {
        return chatRoomService.getPendingChatRooms();
    }

    @PostMapping(value = "/create")
    public ChatRoom createChatroom(@RequestBody CreateChatRoomRequest createChatRoomRequest) {
        return chatRoomService.createChatRoomIfNotPending(createChatRoomRequest.getUserId());
    }

    @PostMapping(value = "/close")
    public ChatRoom closeChatroom(@RequestBody CloseChatRoomRequest closeChatRoomRequest) {
        return chatRoomService.closeChatroom(closeChatRoomRequest.getChatId());
    }
}
