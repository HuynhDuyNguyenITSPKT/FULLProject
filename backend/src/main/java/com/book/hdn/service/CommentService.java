package com.book.hdn.service;

import java.util.List;

import com.book.hdn.dto.response.commentRes;

public interface CommentService {
    void addComment(Long userId, Long chapterId, String content);
    void deleteComment(Long commentId, Long userId);
    List<commentRes> getCommentsByChapterId(Long chapterId);
}
