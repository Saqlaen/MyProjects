package com.example.product_websitefx;

public class User {

    private Integer uid;
    private String email;
    private String passcode;

    public User(Integer uid, String email, String passcode) {
        this.uid = uid;
        this.email = email;
        this.passcode = passcode;
    }

    public Integer getUid() {
        return uid;
    }

    public String getEmail() {
        return email;
    }

    public String getPasscode() {
        return passcode;
    }
}
