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

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.musifyapi.dto.AlbumListResponse;



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

    @GetMapping()
    public ResponseEntity<?> listAlbums() {
        try{
            return ResponseEntity.ok(albumService.getAllAlbums());
        }
        catch(Exception e){
            return ResponseEntity.ok(new AlbumListResponse(false, null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeAlbum(@PathVariable String id){
        try {
            Boolean removed = albumService.removeAlbum(id);
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
