package com.book.hdn.controller.publics;

import com.book.hdn.dto.response.ApiResponse;
import com.book.hdn.service.EmailService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;
    @Value("${spring.mail.username}")
    private String emailSend;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendMail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String text
    ) {
        try {
            emailService.sendMail(emailSend, to, subject, text);
            System.out.println("Request to send email: to=" + to + ", subject=" + subject + ", text=" + text + ", from=" + emailSend);
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(false, "Failed to send email: " + e.getMessage()));
        }
        return ResponseEntity.ok(new ApiResponse(true, "Email sent successfully"));
    }
}
