package laiproject.delivery.repository;

import laiproject.delivery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    void deleteByUsername(String username);
    User findById(int id);
}