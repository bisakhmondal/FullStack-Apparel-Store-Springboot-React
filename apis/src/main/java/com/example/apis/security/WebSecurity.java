package com.example.apis.security;

import com.example.apis.cors.CorsFilter;
import com.example.apis.jwt.JwtFilter;
import com.example.apis.jwt.JwtProvider;
import com.example.apis.userinfo.UserInfoService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private final UserInfoService userInfoService;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;// jwtFilter;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.apply(new FilterConfigurer(jwtProvider));

        http.cors().and().authorizeRequests()
                .antMatchers("/api/v1/newsletter/**").permitAll()
                .antMatchers("/api/v1/registration/**").permitAll()
                .antMatchers("/api/v1/login/**").permitAll()
                .antMatchers("/api/v1/products/**").permitAll()
                .antMatchers("/ping").permitAll()
                .anyRequest()
                .authenticated();
        http.csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userInfoService);
        provider.setPasswordEncoder(passwordEncoder.bCryptPasswordEncoder());
        return provider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
