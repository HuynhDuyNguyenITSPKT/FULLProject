package com.book.hdn.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class commentRes {
    private Long id;
    private String content;
    private String username;
    private Long chapterId;
    private String createdAt;
}
