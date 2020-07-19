package laiproject.delivery.controller;

import laiproject.delivery.repository.RobotRepository;
import laiproject.delivery.model.Robot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
public class RobotController {

    @Autowired
    private RobotRepository robotRepository;

    @Transactional
    @GetMapping("/addRobot")
    public String addRobot() {
        robotRepository.save(new Robot(100));
        return "add robot success";
    }

    @GetMapping("/listRobots")
    public Iterable<Robot> getStations() {
        return robotRepository.findAll();
    }
}