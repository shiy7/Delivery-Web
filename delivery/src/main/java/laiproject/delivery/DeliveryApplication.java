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

import java.util.Map;

@SpringBootApplication
@RestController
public class DeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeliveryApplication.class, args);
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @PostMapping (value = "/recommend",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String recommend(@RequestBody Map params) {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey("")
                .build();

        String stationAddress = "3783 20th St, San Francisco, CA 94110";
        String userAddress = params.get("useraddress").toString();
//        "1031 Irving St, San Francisco, CA 94122";
        String receiverAddress = params.get("raddress").toString();
//        "450 10th St, San Francisco, CA 94103";
        long dis = calculate(userAddress,receiverAddress);
        JsonObject jsonObj = new JsonObject();
        jsonObj.addProperty("distance",dis);
        return jsonObj.toString();
//        try{
//            DistanceMatrixApiRequest req = DistanceMatrixApi.newRequest(context);
//            DistanceMatrix disReceiverStation = req.origins(userAddress).destinations(stationAddress).await();
//
//            return disReceiverStation;
//        }catch (ApiException e){
//            System.out.println(e.getMessage());
//        }catch (Exception e){
//            System.out.println(e.getMessage());
//        }

//        return null;
    }

    public long calculate(String source, String destination){
        long result = -1;
        OkHttpClient client = new OkHttpClient();
        String API_KEY = "";
        String url="https://maps.googleapis.com/maps/api/distancematrix/json?origins="+source+"&destinations="+destination+"&key="+ API_KEY;
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

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public String getFoosBySimplePath() {
        return "Get some Foos";
    }



}
