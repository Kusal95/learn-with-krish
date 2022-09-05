package com.kusal.orderservice.service;

import com.kusal.orderservice.domain.FuelOrder;
import com.kusal.orderservice.domain.OrderStatus;
import com.kusal.orderservice.model.Event;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    FuelOrder saveOrder(FuelOrder order);
    void saveOrderStatus(String generatedKey);
    void UpdateOrderStatus(Event event);
    OrderStatus getOrderStatus(String generatedKey);
    FuelOrder getOrderByKey(String generatedKey);
    List<FuelOrder> getAllOrders();
    List<FuelOrder> getOrdersToDispatch();
    List<FuelOrder> getOrdersByStationNumber(String stationNumber);
    FuelOrder updateOrderReceived(String key, LocalDateTime receivedDateTime);
}
