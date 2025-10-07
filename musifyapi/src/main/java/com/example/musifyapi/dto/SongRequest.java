package com.example.musifyapi.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.musifyapi.document.Song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongRequest {
    private String id;
    private String name;
    private String desc;
    private String album;
    private MultipartFile audioFile;
    private MultipartFile imageFile;
}
