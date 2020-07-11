package laiproject.delivery.model;

import javax.persistence.*;

@Entity
@Table(name = "robot")
public class Robot {
    @Id
    @Column(name = "robot_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int max_capacity;

    @Column(name = "isAvailable")
    private boolean isAvailable;
    private double robot_range;
    private String address;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "station_id")
    private Station station;

    public Robot(int max_capacity) {
        this.max_capacity = max_capacity;
        this.isAvailable = true;
        this.robot_range = 100;
        this.address = "xxxxx";
    }

    public int getRobotId() {
        return id;
    }

    public void setRobotId(int robot_id) {
        this.id = robot_id;
    }

    public int getMaxCapacity() {
        return max_capacity;
    }

    public void setMaxCapacity(int max_capacity) {
        this.max_capacity = max_capacity;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public double getRobotRange() {
        return robot_range;
    }

    public void setRobotRange(double robot_range) {
        this.robot_range = robot_range;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }
}
