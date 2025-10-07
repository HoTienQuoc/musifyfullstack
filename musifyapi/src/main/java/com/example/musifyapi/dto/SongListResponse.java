package com.example.musifyapi.dto;

import java.util.List;

import com.example.musifyapi.document.Song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongListResponse {
    private boolean success;
    private List<Song> songs;
}
