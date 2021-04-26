package com.example.apis.cart;

import com.example.apis.product.Product;
import com.example.apis.product.ProductService;
import com.example.apis.userinfo.UserInfo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductService productService;
    private final OrderEntityRepository orderEntityRepository;

    @Transactional
    public String addToCart(OrderRequestBody orderRequestBody) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserInfo userInfo = (UserInfo) auth.getPrincipal();
        Optional<ShoppingCart> shoppingCartcheck = cartRepository.findByUserInfo(userInfo);

        ShoppingCart shoppingCart;
        if(!shoppingCartcheck.isPresent()) {
            shoppingCart = new ShoppingCart(userInfo);
            cartRepository.save(shoppingCart);
        }else {
            shoppingCart = shoppingCartcheck.get();
        }

        Optional<Product> product = productService.findProductById(orderRequestBody.getId());
        if(!product.isPresent()){
            throw new IllegalStateException("product id error/not found");
        }

        OrderEntity orderEntity = new OrderEntity(orderRequestBody.getNum(), product.get());
        orderEntityRepository.save(orderEntity);
        shoppingCart.getProducts().add(orderEntity);
        return "Done";
    }

    @Transactional
    public String addToCartMultiple(List<OrderRequestBody> orders) {
        for(OrderRequestBody body: orders){
            this.addToCart(body);
        }
        return "Done";
    }

    List<OrderEntity> findOrderedProducts(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserInfo userInfo = (UserInfo) auth.getPrincipal();
//        Pageable topfive = PageRequest.of(0,5);
//        return  cartRepository.findAllByUserInfoLimitK(userInfo, 5);
        List<ShoppingCart> shoppingCarts = cartRepository.findAllByUserInfo(userInfo);
        List<OrderEntity> products = new ArrayList<OrderEntity>();
        for(int i = shoppingCarts.size()-1;i>=0;i--){
            products.addAll(shoppingCarts.get(i).getProducts());
        }
        return products;
    }
}
