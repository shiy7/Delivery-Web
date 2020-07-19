package laiproject.delivery.repository;

import laiproject.delivery.model.Customer;
import laiproject.delivery.model.Station;
import org.springframework.data.repository.CrudRepository;

public interface StationRepository extends CrudRepository<Station, Integer> {
    Customer findStationById(Integer id);
}
