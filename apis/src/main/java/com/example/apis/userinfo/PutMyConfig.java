package com.example.apis.userinfo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class PutMyConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserInfoRepository userInfoRepository){
        return args -> {
            UserInfo u1 = new UserInfo(
                 "bisakh",
                 "mondal",
                 "bisakhmondal00@gmail.com",
                 new BCryptPasswordEncoder().encode("password"),
                    UserRole.ADMIN,
                    true
            );
            userInfoRepository.save(u1);
        };
    }
}
