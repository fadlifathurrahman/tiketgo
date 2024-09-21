package com.movie.movie.controller;

import com.movie.movie.controller.dto.GenreDto;
import com.movie.movie.model.Genre;
import com.movie.movie.repository.GenreRepository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/genre")
public class GenreController {

    GenreRepository genreRepository;

    public GenreController(GenreRepository genreRepository) {

        this.genreRepository = genreRepository;
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<Genre>> findAll() {

        List<Genre> genres = genreRepository.findAllNotDeleted();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getById(@PathVariable Integer id) {

        Genre genre = genreRepository.findById(id).orElse(null);
        if (genre == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(genre);
    }

    @PostMapping("/add-genre")
public ResponseEntity<String> create(@RequestBody GenreDto genreDto) {

        if (genreRepository.findByGenreName(genreDto.getGenreName()).isPresent()) {
            return ResponseEntity.badRequest().body("Genre already exists");
        }
        Genre genre = new Genre();
        genre.setGenreName(genreDto.getGenreName());
        Genre savedGenre = genreRepository.save(genre);
        return ResponseEntity.ok("Genre " + savedGenre.getGenreName() + " has been successfully added");
    }

    @PutMapping("edit-genre/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id,
            @RequestBody GenreDto genreDto) {

        Genre genre = genreRepository.findById(id).orElse(null);
        if (genre == null) {
            return ResponseEntity.badRequest().body("Id invalid");
        }
        if (genre.getDeletedAt() != null) {
            return ResponseEntity.badRequest().body("Genre has been deleted, cannot be edited");
        }
        if (genreRepository.findByGenreName(genreDto.getGenreName()).isPresent()) {
            return ResponseEntity.badRequest().body("Genre already exists");
        }
        genre.setGenreName(genreDto.getGenreName());
        genre = genreRepository.save(genre);
        return ResponseEntity.ok("Genre has been successfully edited");
    }

    @DeleteMapping("delete-genre/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {

        Genre genre = genreRepository.findById(id)
                .filter(g -> g.getDeletedAt() == null)
                .orElse(null);
        if (genre == null) {
            return ResponseEntity.badRequest().body("Id invalid");
        }
        genre.setGenreName("deleted_genre");
        genre.setDeletedAt(LocalDateTime.now());
        genreRepository.save(genre);
        return ResponseEntity.ok("Genre has been successfully deleted");
    }
}