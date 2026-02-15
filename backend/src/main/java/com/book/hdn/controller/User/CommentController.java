package com.book.hdn.controller.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.hdn.dto.request.CommentRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.User;
import com.book.hdn.repository.UserRepository;
import com.book.hdn.service.CommentService;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commandService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse> getCommentsByChapterId(@RequestParam Long chapterId) {
        return ResponseEntity.ok(new ApiResponse(true, commandService.getCommentsByChapterId(chapterId)));
    }
    

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addComment(
            @RequestParam String username,
            @RequestParam Long idchapter,
            @RequestBody CommentRequest request
    ) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long iduser = user.getId();

        commandService.addComment(iduser, idchapter, request.getContent());

        return ResponseEntity.ok(new ApiResponse(true, "Comment added successfully"));
    }
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse> deleteComment(@RequestParam Long idcomment, @RequestParam Long iduser) {
        commandService.deleteComment(idcomment, iduser);
        return ResponseEntity.ok(new ApiResponse(true, "Comment deleted successfully"));
    }
}
