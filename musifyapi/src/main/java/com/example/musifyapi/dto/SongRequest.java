package com.example.musifyapi.dto;

import org.springframework.web.multipart.MultipartFile;


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
