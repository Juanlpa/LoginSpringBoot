package com.example.demo.Controllers;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("users")
@Service
public class ApiUser {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/search")
    public User searchbyUserName(@RequestBody String username){
        return userRepository.findByUsername(username);
    }

}