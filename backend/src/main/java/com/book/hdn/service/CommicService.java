package com.book.hdn.service;

import com.book.hdn.dto.response.ListComicsReponse;
import com.book.hdn.repository.ComicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommicService implements ComicInterface {

    @Autowired
    private ComicRepository comicRepository;

    @Override
    @Cacheable(value = "comics", key = "'all'")
    public List<ListComicsReponse> getAll() {
        return comicRepository.findAll()
                .stream()
                .map(comic -> {
                    ListComicsReponse dto = new ListComicsReponse();
                    dto.setId(comic.getId());
                    dto.setTitle(comic.getTitle());
                    dto.setAuthor(comic.getAuthor());
                    dto.setCoverImage(comic.getCoverImage());
                    dto.setDescription(comic.getDescription());
                    return dto;
                })
                .toList();
    }

    @Override
    @CacheEvict(value = "comics", allEntries = true)
    public void clear() {
    }
}