package com.kusal.orderservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data @AllArgsConstructor
public class ScheduleData {
    private Long scheduleId;
    private LocalDate scheduledDate;
}
