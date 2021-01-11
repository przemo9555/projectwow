package com.project.wow.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @NonNull
    private String username;
    @NonNull
    private String password;
}
