package com.example.musifyapi.dto;

import java.util.List;

import com.example.musifyapi.document.Album;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumListResponse {
    private Boolean success;
    private List<Album> albums;

}
