package com.example.demo.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "users")
public class User {
    @Id
    private int id;

    private String username;

    private String password;

    private String rol;

    public int getId() {
        return id;
    }

    public User(int id, String username, String rol, String password) {
        this.id = id;
        this.username = username;
        this.rol = rol;
        this.password = password;
    }

    public User(){}
    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}