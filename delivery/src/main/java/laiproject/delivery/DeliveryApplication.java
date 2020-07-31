package laiproject.delivery;

import com.google.gson.JsonObject;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.Map;

@SpringBootApplication
@RestController
public class
DeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeliveryApplication.class, args);
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @PostMapping (value = "/recommend",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String recommend(@RequestBody Map params) {
        String Distance_API_KEY = "AIzaSyCxiKSD-acPm1syrHWVQtCln60p1QTuoQM";
        String GeoCoding_API_KEY = "AIzaSyDeCLN3mz6w9LmFUsHwxbGhuBeIMdka8rg";

        String stationAddress = "3783 20th St, San Francisco, CA 94110";
        String userAddress = params.get("useraddress").toString();
//        "3899 20th St, San Francisco, CA 94114";
        String receiverAddress = params.get("raddress").toString();
//        "3491 20th St, San Francisco, CA 94110";

        // get the robot deliver distance and time
        long robotDis = calculateRobotDistance(userAddress,receiverAddress,Distance_API_KEY) + calculateRobotDistance(userAddress,stationAddress,Distance_API_KEY);
        double robotDeliverTime = estimateRobotDeliveryTime(robotDis);
        double robotCost = calculateRobotCost(robotDis);

        // get the drone deliver distance and time
        double droneDis = calculateDroneDistance(userAddress,receiverAddress,GeoCoding_API_KEY);
        droneDis = (double) Math.round(droneDis*100)/100;
        double droneDeliverTime = estimateDroneDeliveryTime(droneDis);
        double droneCost =calculateDroneCost(droneDis);

        JsonObject jsonObj = new JsonObject();
        jsonObj.addProperty("robotdistance",(double)Math.round(robotDis/10)/100);
        jsonObj.addProperty("robottime",displayTime(robotDeliverTime));
        jsonObj.addProperty("robotcost",robotCost);
        jsonObj.addProperty("dronedistance",droneDis);
        jsonObj.addProperty("dronetime",displayTime(droneDeliverTime));
        jsonObj.addProperty("dronecost",droneCost);
        return jsonObj.toString();

    }

    public long calculateRobotDistance(String source, String destination, String API_KEY){
        long result = -1;
        OkHttpClient client = new OkHttpClient();
        String url="https://maps.googleapis.com/maps/api/distancematrix/json?origins="+source+"&destinations="+destination+"&key="+ API_KEY+"&mode=walking"+"&units=metric";
        try {
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            Response response = client.newCall(request).execute();
            String res = response.body().string();
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(res);
            JSONObject jsonobj=(JSONObject)obj;
            JSONArray dist=(JSONArray)jsonobj.get("rows");
            JSONObject obj2 = (JSONObject)dist.get(0);
            JSONArray disting=(JSONArray)obj2.get("elements");
            JSONObject obj3 = (JSONObject)disting.get(0);
            JSONObject obj4=(JSONObject)obj3.get("distance");
            result = (long)obj4.get("value");

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return result;
    }

    private double estimateRobotDeliveryTime(long distance){
        DecimalFormat format = new DecimalFormat("##.0000");
        // from km/hr to m/s
        double robotSpeed = 5.6327 / 3.6;
        return Double.parseDouble(format.format(((double)distance / robotSpeed)));
    }

    private double[] getGeolocation(String address, String API_KEY){
        double[] result = new double[2];
    OkHttpClient client = new OkHttpClient();
    String url="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+ API_KEY;
    try {
        Request request = new Request.Builder()
                .url(url)
                .build();
        Response response = client.newCall(request).execute();
        String res = response.body().string();
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(res);
        JSONObject jsonobj=(JSONObject)obj;
        JSONArray results = (JSONArray)jsonobj.get("results");
        JSONObject body = (JSONObject)results.get(0);
        JSONObject geometry = (JSONObject)body.get("geometry");
        JSONObject location = (JSONObject) geometry.get("location");
        double lat = (double) location.get("lat");
        double lng = (double) location.get("lng");
        result[0] = lat;
        result[1] = lng;
        System.out.println(lat);
        System.out.println(lng);

    }catch (Exception e){
        System.out.println(e.getMessage());
    }
    return result;

}

    private double calculateDroneDistance(String source, String destination, String API_KEY){
        double totalDistance;
        double[] sourceCordinates = getGeolocation(source,API_KEY);
        double[] destinationCordinates = getGeolocation(destination,API_KEY);

        double stationLat = 37.758120;
        double stationLng = -122.425252;
//        double distanceByStation = directDistance(sourceCordinates[0],sourceCordinates[1],stationLat,stationLng);

        totalDistance = directDistance(sourceCordinates[0],sourceCordinates[1],destinationCordinates[0],destinationCordinates[1]);
        return totalDistance;
    }

    private double directDistance(double lat1, double lon1, double lat2, double lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515 * 1.609344;
            return dist;
        }
    }

    private double calculateDroneCost(double distance){
        // total distance is less than 1 mile
        if(distance < 1)return 15.0;
        else if(distance < 3){
            return 15 + (distance - 1) * 8;
        }else if(distance <= 4)
            return 15 + (distance - 1) * 10;
        else return -1;
    }

    private double calculateRobotCost(long distance){
        double disInKm = (double)distance/1000;
        // total distance is less than 1 mile
        if(disInKm < 1)return 8;
        else if(disInKm < 3)
            return 8 + (disInKm - 1) * 4;
        else if(disInKm < 6){
            return 15 + (disInKm - 3) * 4.5;
        }else if(disInKm <= 10)
            return 25 + (disInKm - 6) * 5;
        else return -1;
    }
    private double estimateDroneDeliveryTime(double distance){
        if(distance < 1)distance = 1.0;
        DecimalFormat format = new DecimalFormat("##.0000");
        // from km/hr to m/s
        double robotSpeed = 30 / 3.6;
        return Double.parseDouble(format.format((distance * 1000 / robotSpeed)));
    }

    private java.lang.String displayTime(double seconds){
        int hrs = (int)(seconds / 3600);
        seconds = seconds % 3600;
        int mins = (int)(seconds / 60);
        StringBuilder sb = new StringBuilder("");
        sb.append(hrs);
        sb.append(" Hours ");
        sb.append(mins);
        sb.append(" Mins ");
        return sb.toString();
    }









    @PostMapping(value = "/shipping" ,consumes = MediaType.APPLICATION_JSON_VALUE)
    public String hello(@RequestBody Map params){
        // need to be a JSON string
        return "username is " + params.get("username")
                + "userphone is " + params.get("userphone")
                + "useraddress is " + params.get("userphone")
                + "receiver name is " + params.get("rname")
                + "receiver phone is " + params.get("rphone")
                + "receiver address is " + params.get("raddress")
                + "size is " + params.get("size")
                + "emergency " + params.get("emergency")
                + "weight " + params.get("weight");
    }

    @PostMapping (value = "/geo",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String geocoding(@RequestBody Map params){
        String senderAddress = params.get("senderAddress").toString();
        String receiverAddress = params.get("receiverAddress").toString();
        String robotAddress = params.get("robotAddress").toString();


        String API_KEY = "AIzaSyDeCLN3mz6w9LmFUsHwxbGhuBeIMdka8rg";
        StringBuilder sb = new StringBuilder("");
        double[] senderCord = getGeolocation(senderAddress,API_KEY);
        double[] receiverCord = getGeolocation(receiverAddress,API_KEY);
        double[] robotCord = getGeolocation(robotAddress,API_KEY);


        JsonObject jsonObj = new JsonObject();
        jsonObj.addProperty("senderLat",senderCord[0]);
        jsonObj.addProperty("senderLng",senderCord[1]);
        jsonObj.addProperty("receiverLat",receiverCord[0]);
        jsonObj.addProperty("receiverLng",receiverCord[1]);
        jsonObj.addProperty("robotLat",robotCord[0]);
        jsonObj.addProperty("robotLng",robotCord[1]);
        return jsonObj.toString();
    }



}
