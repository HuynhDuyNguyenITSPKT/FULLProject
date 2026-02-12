package com.book.hdn.repository;

import com.book.hdn.entity.Comic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComicRepository extends JpaRepository<Comic, Long> {}