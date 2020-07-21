package laiproject.delivery.auth;

import laiproject.delivery.Service.SecurityService;
import laiproject.delivery.Service.UserService;
import laiproject.delivery.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;


    @PostMapping("/registration")
    public String registration(@RequestBody User user) {
        user.setEnabled(true);
        //userValidator.validate(user, bindingResult);
        userService.save(user);

        securityService.autoLogin(user.getUsername(), user.getPasswordConfirm());

        return "registration success";
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

    @PostMapping({"/", "/welcome"})
    public String welcome() {
        return "Welcome! This is the main page";
    }


}
