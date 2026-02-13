package com.book.hdn.service;

import com.book.hdn.dto.request.ChapterRequest;
import com.book.hdn.dto.response.ApiResponse;

public interface ChapterService {

    ApiResponse addChapter(ChapterRequest request, Long comicId);
}