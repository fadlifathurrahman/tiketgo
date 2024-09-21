package com.movie.movie.repository;

import com.movie.movie.model.Genre;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GenreRepository 
extends JpaRepository<Genre, Integer> {
    @Query("select g from Genre g where g.deletedAt is null")
    List<Genre> findAllNotDeleted();
    
    @Query("select g from Genre g where g.genreName=:genreName")
    Optional<Genre> findByGenreName(String genreName);
}
