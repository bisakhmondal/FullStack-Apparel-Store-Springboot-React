package com.example.apis.security;

import com.example.apis.cors.CorsFilter;
import com.example.apis.jwt.JwtFilter;
import com.example.apis.jwt.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
public class FilterConfigurer  extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
        private JwtProvider jwtProvider;

        @Override
        public void configure(HttpSecurity http) throws Exception {
            JwtFilter jwtFilter = new JwtFilter(jwtProvider);
            http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
            CorsFilter corsFilter = new CorsFilter();
            http.addFilterBefore(corsFilter, JwtFilter.class);
        }

}
