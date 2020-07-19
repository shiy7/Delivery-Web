//package laiproject.delivery.model;
//
//import javax.persistence.*;
//import java.io.Serializable;
//
//@Entity
//@Table(name = "orders")
//public class Order implements Serializable{
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private int order_id;
//    private String order_number;
//    private String deliver_address;
//    private String receiver_name;
//    private double package_weight;
//    private double payment;
//    private String shipment_status;
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "robot_id")
//    private Robot robot;
//
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "drone_id")
//    private Drone drone;
//
//    public int getOrderId() {
//        return order_id;
//    }
//
//    public void setOrderId(int order_id) {
//        this.order_id = order_id;
//    }
//
//    public String getOrderNumber() {
//        return order_number;
//    }
//
//    public void setOrderNumber(String order_number) {
//        this.order_number = order_number;
//    }
//
//    public String getDeliverAddress() {
//        return deliver_address;
//    }
//
//    public void setDeliverAddress(String deliver_address) {
//        this.deliver_address = deliver_address;
//    }
//
//    public String getReceiverName() {
//        return receiver_name;
//    }
//
//    public void setReceiverName(String receiver_name) {
//        this.receiver_name = receiver_name;
//    }
//
//    public double getPackageWeight() {
//        return package_weight;
//    }
//
//    public void setPackageWeight(double package_weight) {
//        this.package_weight = package_weight;
//    }
//
//    public double getPayment() {
//        return payment;
//    }
//
//    public void setPayment(double payment) {
//        this.payment = payment;
//    }
//
//    public String getShipmentStatus() {
//        return shipment_status;
//    }
//
//    public void setShipmentStatus(String shipment_status) {
//        this.shipment_status = shipment_status;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Robot getRobot() {
//        return robot;
//    }
//
//    public void setRobot(Robot robot) {
//        this.robot = robot;
//    }
//
//    public Drone getDrone() {
//        return drone;
//    }
//
//    public void setDrone(Drone drone) {
//        this.drone = drone;
//    }
//}
