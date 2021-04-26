package com.example.apis.product;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/products/")
public class ProductController {
    private final ProductService productService;
    @GetMapping("all")
    List<Product> fetchAllProducts(){
        return productService.fetchAll();
    }

    @GetMapping("gender")
    List<Product> fetchByGender(@RequestParam("sex") String sex){
        ProductType productType = (sex.equals("male") || sex.equals("MALE")) ? ProductType.MALE : ProductType.FEMALE;
        return  productService.fetchByGender(productType);
    }

    @GetMapping("arrival")
    List<Product> fetchByArrival(@RequestParam("arrival") String arrivalStr){
        Arrival arrival = (arrivalStr.equals("new") || arrivalStr.equals("NEW")) ? Arrival.NEW :Arrival.CHEAP;
        return productService.fetchByArrival(arrival);
    }

    @GetMapping("specific")
    List<Product> fetchByGenderAndArrival(@RequestParam("sex") String sex, @RequestParam("arrival") String arrivalStr){
        return productService.fetchByGenderAndArrival(sex, arrivalStr);
    }
}
