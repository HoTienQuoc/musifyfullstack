package com.example.musifyapi.repository;

import com.example.musifyapi.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album,String>{
    
}