package laiproject.delivery.controller;

import laiproject.delivery.CRUD.StationRepository;
import laiproject.delivery.model.Customer;
import laiproject.delivery.model.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StationController {

    @Autowired
    private StationRepository stationRepository;

    @GetMapping("/listStations")
    public Iterable<Station> getStations() {
        return stationRepository.findAll();
    }

    @GetMapping("/findStation/{station_id}")
    public Customer findStationById(@PathVariable Integer id) {
        return stationRepository.findStationById(id);
    }
}