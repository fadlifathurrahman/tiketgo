package com.movie.movie.controller;

import com.movie.movie.controller.dto.StudioDto;
import com.movie.movie.model.Studio;
import com.movie.movie.repository.StudioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/studio")
public class StudioController {
    StudioRepository studioRepository;

    public StudioController (StudioRepository studioRepository) {
        this.studioRepository = studioRepository;
    }

    @GetMapping("/find-all-studio")
    public List<Studio> findAll() {
        return studioRepository.findAll();
    }
    @GetMapping("/{id}")
    public Object getbyId(@PathVariable("id") Integer id) {
        Studio studio = studioRepository.findById(id).orElse(null);
        if(studio == null) {
            return ResponseEntity.badRequest().body("ID studio not found");
        }
        return studioRepository.findById(id).orElse(null);
    }

    @PostMapping("/")
    public Object create(@RequestBody StudioDto studioDto) {
        Studio studio = new Studio();
        studio.setStudioName(studioDto.getStudioName());
        return studioRepository.save(studio);
    }
    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody StudioDto studioDto) {
        Studio studio = studioRepository.findById(id).orElse(null);
        if(studio == null) {
            return ResponseEntity.badRequest().body("ID studio not found");
        }
        studio.setStudioName(studioDto.getStudioName());
        return ResponseEntity.ok(studioRepository.save(studio));
    }
    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Studio studio = studioRepository.findById(id).orElse(null);
        if(studio == null) {
            return ResponseEntity.badRequest().body("ID studio not found");
        }
        studioRepository.delete(studio);
        return null;
    }
}
