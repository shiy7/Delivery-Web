package laiproject.delivery.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "orders")
public class Order implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int order_id;
    @Column(name = "orderNumber", unique=true)
    private String orderNumber;
    @Column(name = "deliverAddress")
    private String deliverAddress;
    @Column(name = "receiverName")
    private String receiverName;
    @Column(name = "packageWeight")
    private String packageWeight;
    @Column(name = "payment")
    private String payment;
    @Column(name = "shipmentStatus")
    private String shipmentStatus;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "robot_id")
    private Robot robot;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "drone_id")
    private Drone drone;

    public int getOrderId() {
        return order_id;
    }

    public void setOrderId(int order_id) {
        this.order_id = order_id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String order_number) {
        this.orderNumber = order_number;
    }

    public String getDeliverAddress() {
        return deliverAddress;
    }

    public void setDeliverAddress(String deliver_address) {
        this.deliverAddress = deliver_address;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiver_name) {
        this.receiverName = receiver_name;
    }

    public String getPackageWeight() {
        return packageWeight;
    }


    public void setPackageWeight(String package_weight) {
        this.packageWeight = package_weight;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public String getShipmentStatus() {
        return shipmentStatus;
    }

    public void setShipmentStatus(String shipment_status) {
        this.shipmentStatus = shipment_status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Robot getRobot() {
        return robot;
    }

    public void setRobot(Robot robot) {
        this.robot = robot;
    }

    public Drone getDrone() {
        return drone;
    }

    public void setDrone(Drone drone) {
        this.drone = drone;
    }
}
