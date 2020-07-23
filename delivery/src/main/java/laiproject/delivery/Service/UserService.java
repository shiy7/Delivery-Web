package laiproject.delivery.Service;

import laiproject.delivery.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
