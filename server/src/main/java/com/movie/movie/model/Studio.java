package com.movie.movie.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Studio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String studioName;

    // @JsonIgnore
    // @OneToMany
    // private List<Schedule> schedule;
    
    // @OneToMany
    // private List<Seat> seats;
}
