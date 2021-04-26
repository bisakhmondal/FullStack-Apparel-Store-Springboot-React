package com.example.apis.newsletter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Newsletter {
    @Id
    @SequenceGenerator(
            name = "newsletter_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "newsletter_sequence"
    )
    private Long id;
    private String email;
    private Boolean isVerified=false;

    public Newsletter(String email) {
        this.email = email;
    }
}
