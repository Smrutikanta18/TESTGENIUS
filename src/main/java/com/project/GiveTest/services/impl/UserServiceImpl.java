package com.project.GiveTest.services.impl;

import com.project.GiveTest.entities.User;
import com.project.GiveTest.entities.UserRole;
import com.project.GiveTest.repositories.RoleRepository;
import com.project.GiveTest.repositories.UserRepository;
import com.project.GiveTest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());
        if(local != null){
            throw new Exception("User already Present");
        }else{
            for(UserRole ur: userRoles){
                this.roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local=this.userRepository.save(user);
        }

        return local;
    }

    @Override
    public User getUser(String user) {
        return this.userRepository.findByUsername(user);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(User user, Long id) {
        if(userRepository.existsById(id)){
            user.setId(id);
            return userRepository.save(user);
        }else{
            return null;
        }
    }
}
