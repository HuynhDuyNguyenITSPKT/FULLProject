package com.book.hdn.controller.auth;

import com.book.hdn.dto.request.UserRequest;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.User;
import com.book.hdn.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(
            @RequestBody UserRequest req,
            HttpServletResponse response
    ) {
        ApiResponse result = authService.login(req, response);

        if (!result.getSussess()) {
            return ResponseEntity.status(401).body(result);
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshToken
    ) {
        ApiResponse result = authService.refresh(refreshToken);

        if (!result.getSussess()) {
            return ResponseEntity.status(401).body(result);
        }

        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
        return ResponseEntity.ok(authService.logout(response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getCurrentUser(Authentication authentication) {

        ApiResponse result = authService.getCurrentUser(authentication);

        if (!result.getSussess()) {
            return ResponseEntity.status(401).body(result);
        }

        return ResponseEntity.ok(result);
    }
}
