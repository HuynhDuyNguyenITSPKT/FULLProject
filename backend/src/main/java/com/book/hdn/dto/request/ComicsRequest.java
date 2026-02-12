package com.book.hdn.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComicsRequest {
    private String title;
    private String description;
    private String coverImage;
    private String author;
}
