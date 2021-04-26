package com.example.apis.login;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/login")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class LoginController {
    private final LoginService loginService;
    @PostMapping
    public String login(@RequestBody LoginRequest loginRequest){
        return loginService.login(loginRequest);
    }
}
