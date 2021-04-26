package com.example.apis.product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @SequenceGenerator(
            name = "product_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    private Long id;
    @Enumerated(EnumType.STRING)
    private ProductType productType;
    private String name;
    private String image;

    @Enumerated(EnumType.STRING)
    private Arrival arrival;
    private Double price;
    private Double discount;

    public Product(ProductType productType, String name, String image, Arrival arrival, Double price, Double discount) {
        this.productType = productType;
        this.name = name;
        this.image = image;
        this.arrival = arrival;
        this.price = price;
        this.discount = discount;
    }
}
