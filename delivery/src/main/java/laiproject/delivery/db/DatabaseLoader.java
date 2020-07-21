package laiproject.delivery.db;

import laiproject.delivery.model.User;
import laiproject.delivery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private final UserRepository userRepository;

    public DatabaseLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        addInitUser();
    }

    private void addInitUser() {
        User user = new User("Bob", "sdaslkdjlajskdasodu");
        if (this.userRepository.findByUsername(user.getUsername()) == null) {
            this.userRepository.save(user);
        }
    }
}
