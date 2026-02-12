package com.book.hdn.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListComicsReponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String author;
    private String coverImage;
    private String description;
}