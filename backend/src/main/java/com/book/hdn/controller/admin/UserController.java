package com.book.hdn.controller.admin;


import aj.org.objectweb.asm.commons.TryCatchBlockSorter;
import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.entity.User;
import com.book.hdn.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            Map<String, Object> response = new HashMap<>();
            ApiResponse apiResponse = new ApiResponse();
            response.put("users", users);
            apiResponse.setData(response);
            apiResponse.setSussess(true);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }



}
