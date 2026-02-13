package com.book.hdn.service;

import com.book.hdn.dto.request.ComicsRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.dto.response.ChapterResponse;
import com.book.hdn.dto.response.ListChapter;
import com.book.hdn.dto.response.ListComicsReponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComicInterface {

    List<ListComicsReponse> getAll();

    ApiResponse create(ComicsRequest request);

    ApiResponse update(Long id, ComicsRequest request);

    ApiResponse delete(Long id);

    List<ListChapter> getChaptersByComicId(Long comicId);

    ChapterResponse getChapter(Long comicId, Long chapterNumber);

    ApiResponse  increaseViewCount(Long comicId);

}