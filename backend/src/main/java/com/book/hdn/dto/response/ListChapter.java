package com.book.hdn.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListChapter {
    Long id;
    String title;
    int chapterNumber;
}
