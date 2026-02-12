package com.book.hdn.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Getter @Setter
public class Comic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String author;

    private String coverImage;

    private Long viewsCount = 0L;

    private Long LastWeekViews = 0L;

    @OneToMany(mappedBy = "comic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chapter> chapters;
}

