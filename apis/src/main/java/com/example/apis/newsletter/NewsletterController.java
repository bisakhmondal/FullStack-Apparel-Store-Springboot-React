package com.example.apis.newsletter;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/newsletter")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class NewsletterController {

    private final  NewsletterService newsletterService;

    @PostMapping
    public String register(@RequestBody Newsletter newsletter){

        return newsletterService.register(newsletter);
    }

    @GetMapping("confirm")
    public String confirm(@RequestParam("token") String token){
        return newsletterService.confirmToken(token);
    }

}
