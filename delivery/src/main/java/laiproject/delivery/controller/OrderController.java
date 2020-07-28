package laiproject.delivery.controller;

import laiproject.delivery.model.Order;
import laiproject.delivery.model.User;
import laiproject.delivery.repository.OrderRepository;
import laiproject.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/order/{orderNumber}")
    public ResponseEntity tracking(@PathVariable String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(order);
    }

    @GetMapping("/history")
    public ResponseEntity history(@RequestParam String username) {
        User user = userRepository.findByUsername(username);
        List<Order> orders = orderRepository.findByUser(user);
        if (orders == null || orders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

    /*
    Example JSON:
        {
            "orderNumber": 123,
            "deliverAddress": "4321 Crescent Road",
            "receiverName": "chris",
            "packageWeight": "2kg",
            "payment": "1231243213",
            "shipmentStatus": "Not applicable"
        }
     */
    @PostMapping("/order")
    public ResponseEntity order(@RequestBody Order order, @RequestParam String username) {
        User user = userRepository.findByUsername(username);
        order.setUser(user);
        orderRepository.save(order);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
