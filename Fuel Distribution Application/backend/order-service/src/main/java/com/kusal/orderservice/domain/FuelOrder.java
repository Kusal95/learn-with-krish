package com.kusal.orderservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data @AllArgsConstructor @NoArgsConstructor @Entity @Table(name="fuel_order")
public class FuelOrder implements Serializable {
    @Id
    @Column(name = "order_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "generated_key")
    private String generatedKey;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "station_number")
    private String stationNumber;

    @OneToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name ="generated_key" ,referencedColumnName ="generated_key",insertable = false,updatable = false,foreignKey = @javax.persistence.ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
    private OrderStatus orderStatus;

    public FuelOrder(String fuelType, String generatedKey, LocalDateTime orderDate, Integer quantity, String stationNumber) {
        this.fuelType = fuelType;
        this.generatedKey = generatedKey;
        this.orderDate = orderDate;
        this.quantity = quantity;
        this.stationNumber = stationNumber;
    }
}
