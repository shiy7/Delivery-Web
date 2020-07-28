package laiproject.delivery.repository;

import laiproject.delivery.model.Order;
import laiproject.delivery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderNumber(String orderNumber);
    List<Order> findByUser(User user);
}
