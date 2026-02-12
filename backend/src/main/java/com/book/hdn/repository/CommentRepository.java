package com.book.hdn.repository;

import com.book.hdn.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByChapter_Id(Long comicId);
}
