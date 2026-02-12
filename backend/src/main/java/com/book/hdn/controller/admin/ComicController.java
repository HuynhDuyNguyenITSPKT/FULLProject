package com.book.hdn.controller.admin;

import com.book.hdn.dto.request.ComicsRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.Comic;
import com.book.hdn.repository.ComicRepository;
import com.book.hdn.repository.UserRepository;
import com.book.hdn.service.CommicService;
import com.book.hdn.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/comics")
@RequiredArgsConstructor
public class ComicController {

    private final ComicRepository repo;
    private final CommicService commicService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> create(@RequestBody ComicsRequest comic) {
        ApiResponse response = new ApiResponse();
        Comic newComic = new Comic();
        newComic.setTitle(comic.getTitle());
        newComic.setDescription(comic.getDescription());
        newComic.setAuthor(comic.getAuthor());
        newComic.setCoverImage(comic.getCoverImage());
        repo.save(newComic);
        response.setSussess(true);
        response.setData(newComic);
        commicService.clear();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody ComicsRequest comic) {
        ApiResponse response = new ApiResponse();
        Comic existingComic = repo.findById(id).orElse(null);
        if (existingComic == null) {
            return ResponseEntity.notFound().build();
        }
        existingComic.setTitle(comic.getTitle());
        existingComic.setDescription(comic.getDescription());
        existingComic.setAuthor(comic.getAuthor());
        existingComic.setCoverImage(comic.getCoverImage());
        repo.save(existingComic);
        response.setSussess(true);
        response.setData(existingComic);
        commicService.clear();
        return ResponseEntity.ok(response);
    }
}