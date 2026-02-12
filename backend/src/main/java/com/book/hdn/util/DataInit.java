package com.book.hdn.util;

import com.book.hdn.entity.User;
import com.book.hdn.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInit implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public DataInit(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        User admin = new User();

        admin.setUsername("admin");
        String password = "admin123";

        admin.setPassword(encoder.encode(password));
        admin.setRole("ROLE_ADMIN");

        if (userRepository.findByUsername(admin.getUsername()).isEmpty()) {
            userRepository.save(admin);
        }



    }
}