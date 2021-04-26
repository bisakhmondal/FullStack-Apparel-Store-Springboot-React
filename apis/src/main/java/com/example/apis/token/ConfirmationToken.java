package com.example.apis.token;

import com.example.apis.newsletter.Newsletter;
import com.example.apis.userinfo.UserInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ConfirmationToken {
    @Id
    @SequenceGenerator(
            name = "token_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "token_sequence"
    )
    private Long id;
    @Column(nullable = false)
    private String token;
    @Column(nullable = false)
    private LocalDateTime created_at;
    @Column(nullable = false)
    private LocalDateTime expired_at;
    private LocalDateTime confirmed_at;

    @ManyToOne
    @JoinColumn(
            nullable = true,
            name = "newsletter_id"
    )
    private Newsletter newsletter;

    @ManyToOne
    @JoinColumn(
            nullable = true,
            name = "userinfo_id"
    )
    private UserInfo userInfo;

    public ConfirmationToken(String token,
                             LocalDateTime created_at,
                             LocalDateTime expired_at,
                             Newsletter newsletter) {
        this.token = token;
        this.created_at = created_at;
        this.expired_at = expired_at;
        this.newsletter = newsletter;
    }

    public ConfirmationToken(String token,
                             LocalDateTime created_at,
                             LocalDateTime expired_at,
                             UserInfo userInfo) {
        this.token = token;
        this.created_at = created_at;
        this.expired_at = expired_at;
        this.userInfo = userInfo;
    }
}
