package com.project.GiveTest.controller;

import com.project.GiveTest.config.JwtUtil;
import com.project.GiveTest.entities.JwtRequest;
import com.project.GiveTest.entities.JwtResponse;
import com.project.GiveTest.entities.User;
import com.project.GiveTest.services.impl.UserDetailsServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceimpl userDetailsServiceimpl;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/auth")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest){
        try{
            authenticate(jwtRequest.getUsername(),jwtRequest.getPassword());
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
        UserDetails userDetails = this.userDetailsServiceimpl.loadUserByUsername(jwtRequest.getUsername());
        String token=this.jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username,String password) throws Exception {
        try{
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        }catch (DisabledException e){
                throw new DisabledException("disabled",e);
        }catch (BadCredentialsException e2){
            throw new BadCredentialsException("incorrect username / password",e2);
        }
    }

    @GetMapping("/current-user")
    public User getCurrentUser(
            Principal principal
    ){
        return (User)this.userDetailsServiceimpl.loadUserByUsername(principal.getName());
    }

}
