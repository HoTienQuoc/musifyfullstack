package com.example.musifyapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.musifyapi.dto.SongRequest;
import com.example.musifyapi.service.SongService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addSong(
        @RequestPart("request") String request,
        @RequestPart("audio") MultipartFile audioFile,
        @RequestPart("image") MultipartFile imageFile
    ) {
        try {
            System.out.println("Request JSON: " + request);
            System.out.println("Audio file name: " + audioFile.getOriginalFilename());
        System.out.println("Image file name: " + imageFile.getOriginalFilename());

            ObjectMapper objectMapper = new ObjectMapper();
            SongRequest songRequest = objectMapper.readValue(request, SongRequest.class);
            songRequest.setImageFile(imageFile);
            songRequest.setAudioFile(audioFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(songService.addSong(songRequest));
        } catch (Exception e) {
            e.printStackTrace(); // ✅ In ra stacktrace để thấy lỗi ở console
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping()
    public ResponseEntity<?> listSongs(){
        return ResponseEntity.ok(songService.getAllSongs());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeSong(@PathVariable String id){
        try {
            Boolean removed = songService.removeSong(id);
            if(removed){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            else{
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
