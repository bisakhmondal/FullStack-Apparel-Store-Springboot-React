package com.example.apis.product;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Optional<Product> findProductById(Long id){
        return productRepository.findById(id);
    }

    public List<Product> fetchAll() {
        return productRepository.findAll();
    }

    public List<Product> fetchByGender(ProductType productType) {
        return productRepository.findAllByProductType(productType);
    }

    public List<Product> fetchByArrival(Arrival arrival) {
        return  productRepository.findAllByArrival(arrival);
    }


    public List<Product> fetchByGenderAndArrival(String sex, String arrivalStr) {
        ProductType productType = (sex.equals("male") || sex.equals("MALE")) ? ProductType.MALE : ProductType.FEMALE;
        Arrival arrival = (arrivalStr.equals("new") || arrivalStr.equals("NEW")) ? Arrival.NEW :Arrival.CHEAP;

        return productRepository.findAllByArrivalAndSex(productType, arrival);
    }
}
