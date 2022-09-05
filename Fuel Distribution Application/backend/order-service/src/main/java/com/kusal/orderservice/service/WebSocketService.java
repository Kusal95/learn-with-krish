package com.kusal.orderservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketService {
    private final SimpMessagingTemplate messagingTemplate;

    public void sendMessage(String topicSuffix,String message){
        try {
            Thread.sleep(1000);
            messagingTemplate.convertAndSend("/topic/"+topicSuffix,message);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}
