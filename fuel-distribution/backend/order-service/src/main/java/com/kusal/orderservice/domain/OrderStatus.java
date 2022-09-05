package com.kusal.orderservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Entity @Table(name = "order_status")
public class OrderStatus implements Serializable {
    @Id
    @Column(name = "status_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long statusId;

    @Column(name = "allocation_status")
    private String allocationStatus;

    @Column(name = "dispatch_status")
    private String dispatchStatus;

    @Column(name = "schedule_status")
    private String scheduleStatus;

    @Column(name = "generated_key",nullable = false)
    private String generatedKey;

    private LocalDate scheduledDate;
    private LocalDate dispatchedDate;
    private LocalDateTime receivedDate;


    public OrderStatus(String allocationStatus, String dispatchStatus, String scheduleStatus, String generatedKey) {
        this.allocationStatus = allocationStatus;
        this.dispatchStatus = dispatchStatus;
        this.scheduleStatus = scheduleStatus;
        this.generatedKey = generatedKey;
    }
}
