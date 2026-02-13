package com.book.hdn.service;

import com.book.hdn.dto.request.UserRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.User;
import com.book.hdn.repository.UserRepository;
import com.book.hdn.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    @Override
    public ApiResponse register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        repo.save(user);

        return new ApiResponse(true, "Register success");
    }

    @Override
    public ApiResponse login(UserRequest req, HttpServletResponse response) {

        User user = repo.findByUsername(req.getUsername())
                .orElse(null);

        if (user == null) {
            return new ApiResponse(false, "User not found");
        }

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            return new ApiResponse(false, "Password is incorrect");
        }

        String accessToken = jwtUtil.generateAccessToken(
                user.getUsername(),
                user.getRole()
        );

        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true nếu https
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);

        response.addCookie(cookie);

        return new ApiResponse(true, accessToken);
    }

    @Override
    public ApiResponse refresh(String refreshToken) {

        if (refreshToken == null) {
            return new ApiResponse(false, "Refresh token missing");
        }

        if (!jwtUtil.validateToken(refreshToken)) {
            return new ApiResponse(false, "Invalid refresh token");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        User user = repo.findByUsername(username).orElse(null);

        if (user == null) {
            return new ApiResponse(false, "User not found");
        }

        String newAccessToken = jwtUtil.generateAccessToken(
                user.getUsername(),
                user.getRole()
        );

        return new ApiResponse(true, newAccessToken);
    }

    @Override
    public ApiResponse logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return new ApiResponse(true, "Logout success");
    }

    @Override
    public ApiResponse getCurrentUser(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return new ApiResponse(false, "Unauthorized");
        }

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        return new ApiResponse(true, userDetails);
    }
}
