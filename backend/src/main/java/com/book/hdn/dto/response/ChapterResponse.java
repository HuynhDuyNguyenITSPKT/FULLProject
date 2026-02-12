package com.book.hdn.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterResponse {
    Long id;
    String title;
    int chapterNumber;
    String content;
}
