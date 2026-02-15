package com.book.hdn.repository;

import com.book.hdn.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.chapter.id = :chapterId")
    List<Comment> findByChapterId(Long chapterId);
}
