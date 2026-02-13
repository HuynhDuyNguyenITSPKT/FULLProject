package com.book.hdn.repository;

import com.book.hdn.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    @Query("SELECT c FROM Chapter c WHERE c.comic.id = :comicId ORDER BY c.chapterNumber ASC")
    List<Chapter> findByComicId(Long comicId);

    @Query("SELECT c FROM Chapter c WHERE c.comic.id = :comicId AND c.chapterNumber = :chapterNumber")
    Chapter findByComicIdAndChapterNumber(Long comicId, Long chapterNumber);
}