package com.kusal.orderservice.service;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.kusal.orderservice.domain.FuelOrder;
import com.kusal.orderservice.domain.OrderStatus;
import com.kusal.orderservice.model.DispatchData;
import com.kusal.orderservice.model.Event;
import com.kusal.orderservice.model.ScheduleData;
import com.kusal.orderservice.service.KafkaProducer;
import com.kusal.orderservice.model.OrderData;
import com.kusal.orderservice.repo.OrderRepository;
import com.kusal.orderservice.repo.OrderStatusRepository;
import com.kusal.orderservice.util.GsonLocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    @PersistenceContext
    private EntityManager entityManager;

    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final KafkaProducer kafkaProducer;
    private final Gson gson = new Gson();

    private static final String SUCCESS = "Success";
    private static final String PENDING = "Pending";
    private static final String FAILED = "Failed";


    @Override
    public FuelOrder saveOrder(FuelOrder order) {
        log.info("Saving new order {} to the database", order.getOrderId());
        UUID uuid = UUID.randomUUID();
        order.setGeneratedKey(uuid.toString());
        FuelOrder returnedOrder = orderRepository.save(order);
        saveOrderStatus(returnedOrder.getGeneratedKey());
        OrderData orderData = new OrderData(returnedOrder.getOrderId(), returnedOrder.getFuelType(), returnedOrder.getQuantity());
        Event event = new Event("order_service", "NEW-ORDER", uuid.toString(), PENDING, "", gson.toJson(orderData));
        kafkaProducer.publish(event);
        return returnedOrder;
    }

    @Override
    public void saveOrderStatus(String generatedKey) {
        log.info("Saving new order status by order key {} to the database", generatedKey);
        OrderStatus orderStatus = new OrderStatus(PENDING, PENDING, PENDING, generatedKey);
        orderStatusRepository.save(orderStatus);
    }


    @Override
    public void UpdateOrderStatus(Event event) {
        String key = event.getKey();
        String connectionType = event.getType();
        log.info("update order status by order key {} to the database", key);
        OrderStatus orderStatus = orderStatusRepository.findOrderStatusByGeneratedKey(key);

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDate.class, new GsonLocalDate()).create();
        Gson gson = gsonBuilder.setPrettyPrinting().create();

        switch (connectionType) {
            case "ALLOCATION_COMPLETE":
                orderStatus.setAllocationStatus(SUCCESS);
                break;
            case "SCHEDULE_COMPLETE":
                ScheduleData scheduleData = gson.fromJson(event.getData(), ScheduleData.class);
                orderStatus.setScheduleStatus(SUCCESS);
                orderStatus.setScheduledDate(scheduleData.getScheduledDate());
                break;
            case "DISPATCH_COMPLETE":
                DispatchData dispatchData=gson.fromJson(event.getData(),DispatchData.class);
                orderStatus.setDispatchStatus(SUCCESS);
                orderStatus.setDispatchedDate(dispatchData.getDispatchedDate());
                break;
            case "ALLOCATION_FAILED":
                orderStatus.setAllocationStatus(FAILED);
        }
    }

    @Override
    public OrderStatus getOrderStatus(String generatedKey) {
        log.info("Fetching order status by {} ", generatedKey);
        return orderStatusRepository.findOrderStatusByGeneratedKey(generatedKey);
    }

    @Override
    public FuelOrder getOrderByKey(String generatedKey) {
        log.info("Fetching order by {} ", generatedKey);
        return orderRepository.findOrderByGeneratedKeyId(generatedKey);
    }

    @Override
    public List<FuelOrder> getAllOrders() {
        log.info("Fetching all orders");
        return (List<FuelOrder>) orderRepository.findAll();
    }

    @Override
    public List<FuelOrder> getOrdersToDispatch() {
        log.info("Fetching orders to dispatch");
        return entityManager.createQuery("select f from FuelOrder f join f.orderStatus AS o where o.allocationStatus='Success' and o.scheduleStatus='Success' and o.dispatchStatus='Pending'", FuelOrder.class).getResultList();
    }

    @Override
    public List<FuelOrder> getOrdersByStationNumber(String stationNumber) {
        log.info("Fetching orders by station number : {}",stationNumber);
        return entityManager.createQuery("select f from FuelOrder f join f.orderStatus  where f.stationNumber='"+stationNumber+"'", FuelOrder.class).getResultList();
    }

    @Override
    public FuelOrder updateOrderReceived(String key, LocalDateTime receivedDateTime) {
        log.info("Updating order by order key {} as received ",key);
        FuelOrder fuelOrder = orderRepository.findOrderByGeneratedKeyId(key);
        if(fuelOrder!=null){
            OrderStatus orderStatus = fuelOrder.getOrderStatus();
            orderStatus.setReceivedDate(receivedDateTime);
        }
        return fuelOrder;
    }
}
