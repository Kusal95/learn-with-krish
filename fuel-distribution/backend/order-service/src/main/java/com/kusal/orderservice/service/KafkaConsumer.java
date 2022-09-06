package com.kusal.orderservice.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.kusal.orderservice.model.Event;
import com.kusal.orderservice.model.ScheduleData;
import com.kusal.orderservice.util.GsonLocalDate;
import com.kusal.orderservice.util.GsonLocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final OrderService orderService;
    private final WebSocketService webSocketService;

    @KafkaListener(topics = "order-response-topic", groupId = "order-group")
    void listener(String data) {
        log.info("Listener received :" + data);
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDate.class, new GsonLocalDate()).create();
//        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new GsonLocalDateTime()).create();
        Gson gson = gsonBuilder.setPrettyPrinting().create();
        Event event = gson.fromJson(data, Event.class);
        if (event != null) {
            if (event.getType().equals("ALLOCATION_COMPLETE")
                    || event.getType().equals("DISPATCH_COMPLETE")
                    || event.getType().equals("SCHEDULE_COMPLETE")
                    || event.getType().equals("ALLOCATION_FAILED")) {
                orderService.UpdateOrderStatus(event);
                System.out.println(event.getMessage());
                notifyFrontend("order-status", event.getMessage());
            }
        }
    }

    private void notifyFrontend(String topicName,String message) {
        webSocketService.sendMessage(topicName,message);
    }
}
