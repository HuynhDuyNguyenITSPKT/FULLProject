package com.book.hdn.repository;

import com.book.hdn.entity.Comic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

public interface ComicRepository extends JpaRepository<Comic, Long> {

    @Modifying
    @Transactional
    @Query("""
        update Comic c
        set c.LastWeekViews = c.LastWeekViews + 1,
            c.viewsCount = c.viewsCount + 1
        where c.id = :comicId
    """)
    void increaseViewCount(@Param("comicId") Long comicId);
}