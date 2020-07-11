//package laiproject.delivery.model;
//
//import javax.persistence.*;
//import java.io.Serializable;
//
//@Entity
//@Table(name = "drone")
//public class Drone implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private int drone_id;
//    private int max_capacity;
//    private boolean isAvailable;
//    private double drone_range;
//    private String address;
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "station_id")
//    private Station station;
//
//    public int getDroneId() {
//        return drone_id;
//    }
//
//    public void setDroneId(int drone_id) {
//        this.drone_id = drone_id;
//    }
//
//    public int getMaxCapacity() {
//        return max_capacity;
//    }
//
//    public void setMaxCapacity(int max_capacity) {
//        this.max_capacity = max_capacity;
//    }
//
//    public boolean isAvailable() {
//        return isAvailable;
//    }
//
//    public void setAvailable(boolean available) {
//        isAvailable = available;
//    }
//
//    public double getDroneRange() {
//        return drone_range;
//    }
//
//    public void setDroneRange(double drone_range) {
//        this.drone_range = drone_range;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public Station getStation() {
//        return station;
//    }
//
//    public void setStation(Station station) {
//        this.station = station;
//    }
//}
