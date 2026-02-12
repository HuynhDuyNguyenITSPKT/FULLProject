package com.book.hdn.controller.publics;

import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.dto.response.ChapterResponse;
import com.book.hdn.dto.response.ListChapter;
import com.book.hdn.dto.response.ListComicsReponse;
import com.book.hdn.entity.Chapter;
import com.book.hdn.entity.Comic;
import com.book.hdn.repository.ChapterRepository;
import com.book.hdn.repository.ComicRepository;
import com.book.hdn.service.CommicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comics")
@RequiredArgsConstructor
public class ComicsController {

    private final ComicRepository repo;
    private final ChapterRepository chapterRepo;
    private final CommicService commicService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> all() {
        List<ListComicsReponse> comics = commicService.getAll();
        ApiResponse response = new ApiResponse();
        response.setSussess(true);
        response.setData(comics);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{comicId}")
    public ResponseEntity<ApiResponse> getComicById(@PathVariable Long comicId) {
        List<ListChapter> chapters = chapterRepo.findByComicId(comicId)
                .stream()
                .map(chapter -> {
                    ListChapter dto = new ListChapter();
                    dto.setId(chapter.getId());
                    dto.setTitle(chapter.getTitle());
                    dto.setChapterNumber(chapter.getChapterNumber());
                    return dto;
                })
                .toList();
        return ResponseEntity.ok(new ApiResponse(true, chapters));
    }

    @GetMapping("/{comicId}/{chapterNumber}")
    public ResponseEntity<ApiResponse> getChapterById(@PathVariable Long comicId,@PathVariable Long chapterNumber) {
        Chapter chapter = chapterRepo.findByComicId(comicId)
                .stream()
                .filter(c -> c.getChapterNumber() == chapterNumber)
                .findFirst()
                .orElse(null);
        ChapterResponse dto = new ChapterResponse();
        dto.setId(chapter.getId());
        dto.setTitle(chapter.getTitle());
        dto.setChapterNumber(chapter.getChapterNumber());
        dto.setContent(chapter.getContent());
        return ResponseEntity.ok(new ApiResponse(true, dto));
    }
}