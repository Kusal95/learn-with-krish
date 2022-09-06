package com.kusal.orderservice.api;

import com.kusal.orderservice.domain.FuelOrder;
import com.kusal.orderservice.domain.OrderStatus;
import com.kusal.orderservice.service.OrderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController @RequiredArgsConstructor
@RequestMapping(path = "order-api/v1/order")
public class OrderController {
    private final OrderServiceImpl orderService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<FuelOrder> newOrder(@RequestBody FuelOrder order) {
      URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("order-api/v1/order").toUriString());
       return ResponseEntity.created(uri).body(orderService.saveOrder(order));
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<FuelOrder>> getAllOrders() {
        return ResponseEntity.ok().body(orderService.getAllOrders());
    }

    @CrossOrigin
    @GetMapping(path = "/status/{key}")
    public ResponseEntity<OrderStatus> getOrderStatus(@PathVariable("key") String key) {
        return ResponseEntity.ok().body(orderService.getOrderStatus(key));
    }

    @CrossOrigin
    @GetMapping(path = "/order-key/{key}")
    public ResponseEntity<FuelOrder> getOrder(@PathVariable("key") String key) {
        return ResponseEntity.ok().body(orderService.getOrderByKey(key));
    }

    @CrossOrigin
    @GetMapping(path = "/dispatch")
    public ResponseEntity<List<FuelOrder>> getOrder(){
        return ResponseEntity.ok().body(orderService.getOrdersToDispatch());
    }

    @CrossOrigin
    @GetMapping(path = "/orders/{stationNumber}")
    public ResponseEntity<List<FuelOrder>> getOrdersByStationNumber(@PathVariable("stationNumber") String stationNumber){
        return ResponseEntity.ok().body(orderService.getOrdersByStationNumber(stationNumber));
    }

    @CrossOrigin
    @PutMapping(path="/received/{key}")
    public ResponseEntity<FuelOrder> updateOrderReceived(@PathVariable("key") String key,
                                                         @RequestParam("receivedDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime receivedDateTime){
        return ResponseEntity.ok().body(orderService.updateOrderReceived(key,receivedDateTime));
    }

}
