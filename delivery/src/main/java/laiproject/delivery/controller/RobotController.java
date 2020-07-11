package laiproject.delivery.controller;

import laiproject.delivery.CRUD.RobotRepository;
import laiproject.delivery.CRUD.StationRepository;
import laiproject.delivery.model.Customer;
import laiproject.delivery.model.Robot;
import laiproject.delivery.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RobotController {

    @Autowired
    private RobotRepository robotRepository;

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