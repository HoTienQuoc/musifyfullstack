package com.example.musifyapi.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.musifyapi.document.Song;
import com.example.musifyapi.dto.SongListResponse;
import com.example.musifyapi.dto.SongRequest;
import com.example.musifyapi.repository.SongRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final Cloudinary cloudinary;

    public Song addSong(SongRequest songRequest) throws  IOException{
        Map<String, Object> audioUploadResult = cloudinary.uploader().upload(songRequest.getAudioFile().getBytes(), ObjectUtils.asMap("resource_type","video"));
        Map<String, Object> imageUploadResult = cloudinary.uploader().upload(songRequest.getImageFile().getBytes(), ObjectUtils.asMap("resource_type","image"));

        Double durationSeconds = (Double)audioUploadResult.get("duration");
        String duration = formatDuration(durationSeconds);

        Song newSong = Song.builder()
            .name(songRequest.getName())
            .desc(songRequest.getDesc())
            .album(songRequest.getAlbum())
            .image(imageUploadResult.get("secure_url").toString())
            .file(audioUploadResult.get("secure_url").toString())
            .build();
        return songRepository.save(newSong);
    }

    private String formatDuration(Double durationSeconds) {
        if (durationSeconds == null) {
            return "0:00";
        }
        int minutes = (int)(durationSeconds/60);
        int seconds = (int)(durationSeconds%60);
        return String.format("%d:%02d",minutes,seconds);
    }

    public SongListResponse getAllSongs(){
        return new SongListResponse(true, songRepository.findAll());
    }

    public Boolean removeSong(String id){
        Song existingSong = songRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Song not exception")
        );
        songRepository.delete(existingSong);
        return true;
    }
}
