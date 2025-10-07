package com.example.musifyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.musifyapi.document.Song;

public interface SongRepository extends MongoRepository<Song, String> {

}
