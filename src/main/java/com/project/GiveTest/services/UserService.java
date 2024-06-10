package com.project.GiveTest.services;

import com.project.GiveTest.entities.User;
import com.project.GiveTest.entities.UserRole;

import java.util.Set;

public interface UserService {
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    public User getUser(String user);

    public void deleteUser(Long userId);

    public User updateUser(User user,Long id);
}
