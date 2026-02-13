package com.book.hdn.service;

import com.book.hdn.dto.request.ComicsRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.dto.response.ChapterResponse;
import com.book.hdn.dto.response.ListChapter;
import com.book.hdn.dto.response.ListComicsReponse;
import com.book.hdn.entity.Chapter;
import com.book.hdn.entity.Comic;
import com.book.hdn.repository.ChapterRepository;
import com.book.hdn.repository.ComicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommicService implements ComicInterface {

    private final ComicRepository comicRepository;
    private final ChapterRepository chapterRepository;

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
    public ApiResponse create(ComicsRequest request) {

        Comic comic = new Comic();
        comic.setTitle(request.getTitle());
        comic.setDescription(request.getDescription());
        comic.setAuthor(request.getAuthor());
        comic.setCoverImage(request.getCoverImage());

        comicRepository.save(comic);

        return new ApiResponse(true, comic);
    }

    @Override
    @CacheEvict(value = "comics", allEntries = true)
    public ApiResponse update(Long id, ComicsRequest request) {

        Comic existingComic = comicRepository.findById(id).orElse(null);

        if (existingComic == null) {
            return new ApiResponse(false, "Comic not found");
        }

        existingComic.setTitle(request.getTitle());
        existingComic.setDescription(request.getDescription());
        existingComic.setAuthor(request.getAuthor());
        existingComic.setCoverImage(request.getCoverImage());

        comicRepository.save(existingComic);

        return new ApiResponse(true, existingComic);
    }

    @Override
    @CacheEvict(value = "comics", allEntries = true)
    public ApiResponse delete(Long id) {

        if (!comicRepository.existsById(id)) {
            return new ApiResponse(false, "Comic not found");
        }

        comicRepository.deleteById(id);

        return new ApiResponse(true, "Deleted successfully");
    }

    @Override
    public List<ListChapter> getChaptersByComicId(Long comicId) {

        if (!comicRepository.existsById(comicId)) {
            return null;
        }

        return chapterRepository.findByComicId(comicId)
                .stream()
                .map(chapter -> {
                    ListChapter dto = new ListChapter();
                    dto.setId(chapter.getId());
                    dto.setTitle(chapter.getTitle());
                    dto.setChapterNumber(chapter.getChapterNumber());
                    return dto;
                })
                .toList();
    }

    @Override
    public ChapterResponse getChapter(Long comicId, Long chapterNumber) {

        Chapter chapter =
                chapterRepository.findByComicIdAndChapterNumber(comicId, chapterNumber);

        if (chapter == null) {
            return null;
        }

        ChapterResponse dto = new ChapterResponse();
        dto.setId(chapter.getId());
        dto.setTitle(chapter.getTitle());
        dto.setChapterNumber(chapter.getChapterNumber());
        dto.setContent(chapter.getContent());

        return dto;
    }
}
