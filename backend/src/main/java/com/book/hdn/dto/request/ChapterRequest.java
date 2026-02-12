package com.book.hdn.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterRequest {
    int chapterNumber;
    String title;
    String content;
}
