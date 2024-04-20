package com.chat.yourcaryourway.repository;

import com.chat.yourcaryourway.models.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findByPendingTrue();

    Optional<ChatRoom> findByUserIdAndPendingTrue(Long userId);

    Optional<ChatRoom> findOneByIdAndPendingTrue(Long chatId);

    Optional<ChatRoom> findOneById(long chatId);
}
