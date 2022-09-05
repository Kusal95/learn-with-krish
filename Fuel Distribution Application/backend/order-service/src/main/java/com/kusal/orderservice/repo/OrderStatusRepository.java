package com.kusal.orderservice.repo;

import com.kusal.orderservice.domain.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus,Long> {
    @Query("SELECT o FROM OrderStatus o WHERE o.generatedKey=?1")
    OrderStatus findOrderStatusByGeneratedKey(String generatedKey);
}
