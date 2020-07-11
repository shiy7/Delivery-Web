package laiproject.delivery.CRUD;

import laiproject.delivery.model.Robot;
import org.springframework.data.repository.CrudRepository;

public interface RobotRepository extends CrudRepository<Robot, Integer> {
    Robot findRobotById(Integer id);
}
