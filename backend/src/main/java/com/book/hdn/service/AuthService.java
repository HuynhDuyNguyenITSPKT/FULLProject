package com.book.hdn.service;

import com.book.hdn.dto.request.UserRequest;
import com.book.hdn.dto.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;

public interface AuthService {

    ApiResponse register(com.book.hdn.entity.User user);

    ApiResponse login(UserRequest request, HttpServletResponse response);

    ApiResponse refresh(String refreshToken);

    ApiResponse logout(HttpServletResponse response);

    ApiResponse getCurrentUser(Authentication authentication);
}
