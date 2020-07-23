package laiproject.delivery.db;

import laiproject.delivery.Service.UserService;
import laiproject.delivery.model.User;
import laiproject.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseLoader implements CommandLineRunner {
    @Autowired
    private UserService userService;

    @Autowired
    private final UserRepository userRepository;

    public DatabaseLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        addInitUser();
    }

    void addInitUser() {
        User user = new User("bob", "1234");
        if (this.userRepository.findByUsername(user.getUsername()) == null) {
            userService.save(user);
        }

    }
}
