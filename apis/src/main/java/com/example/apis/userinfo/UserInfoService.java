package com.example.apis.userinfo;

import com.example.apis.security.PasswordEncoder;
import com.example.apis.token.ConfirmationToken;
import com.example.apis.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserInfoService implements UserDetailsService {
    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userInfoRepository.findByEmail(s).orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    @Transactional
    public String register(UserInfo userInfo) {
        Optional<UserInfo> userExists = userInfoRepository.findByEmail(userInfo.getEmail());
        if (userExists.isPresent() && userExists.get().getEnabled()) {
            throw new IllegalArgumentException("email already taken");
        }
        userInfo.setPassword(
                passwordEncoder.bCryptPasswordEncoder().
                        encode(userInfo.getPassword())
        );

        userExists.ifPresent(info -> userInfo.setId(info.getId()));

        userInfoRepository.save(userInfo);

        ConfirmationToken confirmationToken = new ConfirmationToken(
                UUID.randomUUID().toString(),
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                userInfo
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return confirmationToken.getToken();
    }

    @Transactional
    public String confirm(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token)
                .orElseThrow(()-> new IllegalStateException("token not found"));

        if(confirmationToken.getConfirmed_at() != null){
            throw new IllegalArgumentException("email already verified");
        }

        if(confirmationToken.getExpired_at().isBefore(LocalDateTime.now())){
            throw new IllegalArgumentException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        UserInfo userInfo = userInfoRepository.findByEmail(confirmationToken.getUserInfo().getEmail()).get();
        userInfo.setEnabled(true);
        return "Your Email has been Successfully Verified";
    }
}
