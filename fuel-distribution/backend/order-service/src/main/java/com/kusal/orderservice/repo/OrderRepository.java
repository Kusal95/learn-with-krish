package com.kusal.orderservice.repo;

import com.kusal.orderservice.domain.FuelOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<FuelOrder,Long> {
    @Query("SELECT o FROM FuelOrder o WHERE o.generatedKey=?1")
    FuelOrder findOrderByGeneratedKeyId(String generatedKey);
}
