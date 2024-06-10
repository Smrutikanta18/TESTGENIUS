package com.project.GiveTest.controller;

import com.project.GiveTest.entities.Role;
import com.project.GiveTest.entities.User;
import com.project.GiveTest.entities.UserRole;
import com.project.GiveTest.repositories.RoleRepository;
import com.project.GiveTest.repositories.UserRepository;
import com.project.GiveTest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
        user.setProfile("default.png");
        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        String[] roleNames = {"Normal", "Admin"};
        Random random = new Random();
        String randomRoleName = roleNames[random.nextInt(roleNames.length)];
        role.setRoleName(randomRoleName);


        Role savedRole = this.roleRepository.save(role);

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(savedRole);

        roles.add(userRole);

        return this.userService.createUser(user, roles);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) {
        return this.userService.getUser(username);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        this.userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody User user, @PathVariable("id") Long id) {
        return this.userService.updateUser(user, id);
    }
}
