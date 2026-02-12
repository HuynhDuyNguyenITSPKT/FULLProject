package com.book.hdn.controller.admin;

import com.book.hdn.dto.request.ChapterRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.Chapter;
import com.book.hdn.entity.Comic;
import com.book.hdn.repository.ChapterRepository;
import com.book.hdn.repository.ComicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/chapters")
@RequiredArgsConstructor
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private ComicRepository comicRepository;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addChapter(@RequestBody ChapterRequest chapter, @RequestParam("comicId") Long comicId) {
        Comic comic = comicRepository.findById(comicId).orElse(null);
        if (comic == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Comic not found"));
        }
        Chapter newChapter = new Chapter();
        newChapter.setChapterNumber(chapter.getChapterNumber());
        newChapter.setTitle(chapter.getTitle());
        newChapter.setContent(chapter.getContent());
        newChapter.setComic(comic);
        Chapter savedChapter = chapterRepository.save(newChapter);
        return ResponseEntity.ok(new ApiResponse(true, "Chapter added successfully"));
    }
}
