package laiproject.delivery;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
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

    @GetMapping("/recommend")
    public DistanceMatrix recommend() {
//        final GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyCxiKSD-acPm1syrHWVQtCln60p1QTuoQM");
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey("AIzaSyCxiKSD-acPm1syrHWVQtCln60p1QTuoQM")
                .build();
        String userAddress = "1031 Irving St, San Francisco, CA 94122";
        String receiverAddress = "450 10th St, San Francisco, CA 94103";

        try{
            DistanceMatrixApiRequest req = DistanceMatrixApi.newRequest(context);
            DistanceMatrix trix = req.origins(userAddress).destinations(receiverAddress).await();

            return trix;
        }catch (ApiException e){
            System.out.println(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
        }

        return null;
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
