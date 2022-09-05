package com.kusal.orderservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    private String from;
    private String type;
    private String key;
    private String status;
    private String message;
    private String data;
}
