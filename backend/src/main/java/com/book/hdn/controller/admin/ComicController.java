package com.book.hdn.controller.admin;

import com.book.hdn.dto.request.ComicsRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.service.ComicInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/comics")
@RequiredArgsConstructor
public class ComicController {

    private final ComicInterface comicService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> create(@RequestBody ComicsRequest request) {
        return ResponseEntity.ok(comicService.create(request));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> update(
            @PathVariable Long id,
            @RequestBody ComicsRequest request
    ) {
        ApiResponse response = comicService.update(id, request);

        if (!response.getSussess()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {

        ApiResponse response = comicService.delete(id);

        if (!response.getSussess()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }
}
