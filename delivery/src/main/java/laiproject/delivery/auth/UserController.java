package laiproject.delivery.auth;

import laiproject.delivery.Service.SecurityService;
import laiproject.delivery.Service.UserService;
import laiproject.delivery.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;


    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody User user) {
        user.setEnabled(true);
        //userValidator.validate(user, bindingResult);
        try {
            userService.save(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed! Duplicate Username");
        }
        //securityService.autoLogin(user.getUsername(), user.getPasswordConfirm());
        return ResponseEntity.status(HttpStatus.OK).body
                (String.format("User: %s registration success", user.getUsername()));
    }

    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null) {
//            model.addAttribute("error", "Your username and password is invalid.");
            return "Your username and password is invalid.";
        }
        if (logout != null) {
//            model.addAttribute("message", "You have been logged out successfully.");
            return "You have been logged out successfully.";
        }

        return "login page";
    }

    @GetMapping({"/", "/welcome"})
    public String welcome() {
        return "Welcome! This is the main page";
    }


}
