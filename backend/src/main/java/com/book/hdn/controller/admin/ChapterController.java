package com.book.hdn.controller.admin;

import com.book.hdn.dto.request.ChapterRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.Chapter;
import com.book.hdn.entity.Comic;
import com.book.hdn.repository.ChapterRepository;
import com.book.hdn.repository.ComicRepository;
import com.book.hdn.service.ChapterServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/chapters")
@RequiredArgsConstructor
public class ChapterController {

    @Autowired
    private final ChapterServiceImpl chapterService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addChapter(@RequestBody ChapterRequest chapter, @RequestParam("comicId") Long comicId) {
        chapterService.addChapter(chapter, comicId);
        return ResponseEntity.ok(new ApiResponse(true, "Chapter added successfully"));
    }
}
