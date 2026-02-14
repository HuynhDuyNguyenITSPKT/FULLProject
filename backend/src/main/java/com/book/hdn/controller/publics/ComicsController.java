package com.book.hdn.controller.publics;

import com.book.hdn.dto.response.*;
import com.book.hdn.service.ComicInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comics")
@RequiredArgsConstructor
public class ComicsController {

    private final ComicInterface comicService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> all() {

        List<ListComicsReponse> comics = comicService.getAll();

        return ResponseEntity.ok(new ApiResponse(true, comics));
    }

    @GetMapping("/top/viewWeek")
    public ResponseEntity<ApiResponse> topViewWeek(@RequestParam(defaultValue = "7") int limit) {
        List<ListComicsReponse> comics = comicService.getAll()
                .stream()
                .sorted((c1, c2) -> Long.compare(c2.getLastWeekViews(), c1.getLastWeekViews()))
                .limit(limit)
                .toList();

        return ResponseEntity.ok(new ApiResponse(true, comics));
    }

    @GetMapping("/{comicId}")
    public ResponseEntity<ApiResponse> getComicById(@PathVariable Long comicId) {

        List<ListChapter> chapters =
                comicService.getChaptersByComicId(comicId);

        if (chapters == null) {
            return ResponseEntity.notFound()
                    .build();
        }

        return ResponseEntity.ok(new ApiResponse(true, chapters));
    }



    @GetMapping("/{comicId}/{chapterNumber}")
    public ResponseEntity<ApiResponse> getChapter(
            @PathVariable Long comicId,
            @PathVariable Long chapterNumber
    ) {

        ChapterResponse chapter =
                comicService.getChapter(comicId, chapterNumber);

        if (chapter == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new ApiResponse(true, chapter));
    }

    @GetMapping("/viewcomic/{comicId}")
    public ResponseEntity<ApiResponse> incrementViewCount(@PathVariable Long comicId) {
        ApiResponse response = comicService.increaseViewCount(comicId);

        if (!response.getSussess()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }
}
