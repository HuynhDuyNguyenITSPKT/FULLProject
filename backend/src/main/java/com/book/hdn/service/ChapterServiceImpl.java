package com.book.hdn.service;

import com.book.hdn.dto.request.ChapterRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.Chapter;
import com.book.hdn.entity.Comic;
import com.book.hdn.repository.ChapterRepository;
import com.book.hdn.repository.ComicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final ComicRepository comicRepository;

    @Override
    public ApiResponse addChapter(ChapterRequest request, Long comicId) {

        Comic comic = comicRepository.findById(comicId).orElse(null);

        if (comic == null) {
            return new ApiResponse(false, "Comic not found");
        }

        Chapter chapter = new Chapter();
        chapter.setChapterNumber(request.getChapterNumber());
        chapter.setTitle(request.getTitle());
        chapter.setContent(request.getContent());
        chapter.setComic(comic);

        chapterRepository.save(chapter);

        return new ApiResponse(true, "Chapter added successfully");
    }
}
