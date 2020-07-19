package laiproject.delivery.model;

import javax.persistence.*;

@Entity
@Table(name = "station")
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "station_id")
    private int id;
    private int drone_number;
    private int robot_number;
    private String address;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDrone_number() {
        return drone_number;
    }

    public void setDrone_number(int drone_number) {
        this.drone_number = drone_number;
    }

    public int getRobot_number() {
        return robot_number;
    }

    public void setRobot_number(int robot_number) {
        this.robot_number = robot_number;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
