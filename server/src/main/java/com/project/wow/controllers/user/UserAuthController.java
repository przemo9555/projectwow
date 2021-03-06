package com.project.wow.controllers.user;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.project.wow.dao.entity.User;
import com.project.wow.dto.auth.LoginRequest;
import com.project.wow.dto.auth.RegisterRequest;
import com.project.wow.dto.auth.TokenDetails;
import com.project.wow.repository.UserRepository;
import com.project.wow.security.jwt.JwtUtils;
import com.project.wow.service.UserService;
import com.sun.org.apache.regexp.internal.RE;
import lombok.NonNull;
import org.mapstruct.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class UserAuthController {

    private static final Logger logger = LoggerFactory.getLogger(UserAuthController.class);

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtUtils jwtUtils;


    @Autowired
    public UserAuthController(UserRepository userRepository, UserService userService, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("register")
    public ResponseEntity<HttpStatus> register(@RequestBody @NonNull RegisterRequest request) {
        return userService.registerUser(request);
    }


    @PostMapping("login")
    public TokenDetails login(@RequestBody @NonNull LoginRequest loginRequest) {
        String token = userService.login(loginRequest);
        return new TokenDetails(token);
    }

    @GetMapping("logout")
    public ResponseEntity<String> logout(@Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        logger.info("Admin has logged out");
        session.invalidate();
        return ResponseEntity.ok("Admin has logged out");
    }

    @GetMapping("refresh-token")
    public TokenDetails refreshToken(@RequestHeader(name = "Authorization") String token) {
        if (token != null && jwtUtils.validateJwtToken(token)) {
            return new TokenDetails(jwtUtils.createToken((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        } else {
            throw new TokenExpiredException("Could not refresh token");
        }
    }

}
