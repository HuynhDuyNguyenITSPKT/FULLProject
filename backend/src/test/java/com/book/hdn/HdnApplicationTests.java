package com.book.hdn;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class HdnApplicationTests {
    @Value("${SPRING_DATASOURCE_URL}")
    private String url;
    @Test
    void contextLoads() {
        System.out.println("URL = " + url);
    }

}
