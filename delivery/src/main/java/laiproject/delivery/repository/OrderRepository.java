package laiproject.delivery.repository;

import laiproject.delivery.model.Order;
import laiproject.delivery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderNumber(String orderNumber);
}
