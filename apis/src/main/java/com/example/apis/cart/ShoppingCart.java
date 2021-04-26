package com.example.apis.cart;

import com.example.apis.product.Product;
import com.example.apis.userinfo.UserInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ShoppingCart {
    @Id
    @SequenceGenerator(
            name = "cart_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cart_sequence"
    )
    private Long id;

    @OneToOne
    @JoinColumn(
            nullable = false,
            name = "userinfo_id"
    )
    private UserInfo userInfo;

    @OneToMany
//    @JoinColumn(
//            name = "products"
//    )
    private List<OrderEntity> products = new ArrayList<OrderEntity>();

    public ShoppingCart(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
