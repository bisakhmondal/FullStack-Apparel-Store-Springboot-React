package com.example.apis.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByArrival(Arrival arrival);
    List<Product> findAllByProductType(ProductType productType);
//    Optional<Product> findById(Long id);

    @Query("SELECT p FROM Product p WHERE p.productType=?1 AND p.arrival=?2")
    List<Product> findAllByArrivalAndSex(ProductType sex, Arrival arrival);
}
