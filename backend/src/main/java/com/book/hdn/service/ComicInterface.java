package com.book.hdn.service;

import com.book.hdn.dto.response.ListComicsReponse;

import java.util.List;

public interface ComicInterface {
    void clear();
    List<ListComicsReponse> getAll();
}
