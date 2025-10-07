package com.example.musifyapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.musifyapi.dto.AlbumRequest;
import com.example.musifyapi.service.AlbumService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @PostMapping()
    public ResponseEntity<?> addAlbum(
        @RequestPart("request") String request,
        @RequestPart("file") MultipartFile file
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AlbumRequest albumRequest = objectMapper.readValue(request, AlbumRequest.class);
            albumRequest.setImageFile(file);
            return ResponseEntity.status(HttpStatus.CREATED).body(albumService.addAlbum(albumRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
