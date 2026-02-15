package com.book.hdn.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.hdn.dto.response.commentRes;
import com.book.hdn.entity.Chapter;
import com.book.hdn.entity.Comment;
import com.book.hdn.entity.User;
import com.book.hdn.repository.ChapterRepository;
import com.book.hdn.repository.CommentRepository;
import com.book.hdn.repository.UserRepository;

@Service
public class CommentImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userService;

    @Autowired
    private ChapterRepository chapterService;



    @Override
    public void addComment(Long userId, Long chapterId, String content){
        Comment comment = new Comment();

        User user = userService.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Chapter chapter = chapterService.findById(chapterId).orElseThrow(() -> new RuntimeException("Chapter not found"));

        comment.setUser(user);
        comment.setChapter(chapter);    
        comment.setContent(content);
        commentRepository.save(comment);
    }
    @Override
    public void deleteComment(Long commentId, Long userId){
        commentRepository.deleteById(commentId);
    }
    @Override
    public List<commentRes> getCommentsByChapterId(Long chapterId) {
        List<Comment> comments = commentRepository.findByChapterId(chapterId);
        return comments.stream().map(comment -> new commentRes(
            comment.getId(),
            comment.getContent(),
            comment.getUser().getUsername(),
            comment.getChapter().getId(),
            comment.getCreatedAt().toString()
        )).toList();
    }
}
