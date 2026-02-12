package com.book.hdn.controller.auth;

import com.book.hdn.dto.request.UserRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.User;
import com.book.hdn.repository.UserRepository;
import com.book.hdn.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        repo.save(user);

        return ResponseEntity.ok(
                new ApiResponse(true, "Register success")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(
            @RequestBody UserRequest req,
            HttpServletResponse response
    ) {

        User user = repo.findByUsername(req.getUsername())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse(false, "User not found"));
        }

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse(false, "Password is incorrect"));
        }

        // Access token
        String accessToken = jwtUtil.generateAccessToken(
                user.getUsername(),
                user.getRole()
        );

        // Refresh token
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true nếu dùng https
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);

        response.addCookie(cookie);

        return ResponseEntity.ok(
                new ApiResponse(true, accessToken)
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshToken
    ) {

        if (refreshToken == null) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse(false, "Refresh token missing"));
        }

        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse(false, "Invalid refresh token"));
        }

        String username = jwtUtil.extractUsername(refreshToken);
        User user = repo.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(401)
                    .body(new ApiResponse(false, "User not found"));
        }

        String newAccessToken = jwtUtil.generateAccessToken(
                user.getUsername(),
                user.getRole()
        );

        return ResponseEntity.ok(
                new ApiResponse(true, newAccessToken)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok(
                new ApiResponse(true, "Logout success")
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getCurrentUser(Authentication authentication) {

        ApiResponse apiResponse = new ApiResponse();

        if (authentication == null || !authentication.isAuthenticated()) {
            apiResponse.setSussess(false);
            return ResponseEntity.status(401).body(apiResponse);
        }

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();
        apiResponse.setSussess(true);
        apiResponse.setData(userDetails);

        return ResponseEntity.ok(apiResponse);
    }
}

