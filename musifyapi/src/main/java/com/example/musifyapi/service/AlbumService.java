package com.example.musifyapi.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.musifyapi.document.Album;
import com.example.musifyapi.dto.AlbumRequest;
import com.example.musifyapi.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;
    
    public Album addAlbum(AlbumRequest albumRequest) throws IOException{
        Map<String, Object> imageUploadResult = cloudinary.uploader().upload(albumRequest.getImageFile().getBytes(), ObjectUtils.asMap("resource_type","image"));
        Album newAlbum = Album.builder()
                .name(albumRequest.getName())
                .desc(albumRequest.getDesc())
                .bgColour(albumRequest.getBgColor())
                .imageUrl(imageUploadResult.get("secure_url").toString())
                .build();
        return albumRepository.save(newAlbum);
    }
}
