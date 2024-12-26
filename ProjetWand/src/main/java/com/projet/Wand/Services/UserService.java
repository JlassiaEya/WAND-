package com.projet.Wand.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projet.Wand.Entity.User;
import com.projet.Wand.Repository.UserRep;

@Service
public class UserService {

    @Autowired
    private UserRep userRep;


    public User saveUser(User user) {
        return userRep.save(user);
    }

    public User findByEmailAndPassword(String email, String password) {
        return userRep.findByEmailAndPassword(email, password);
    }

  /*  public User findByEmail(String email) {
        return userRep.findByEmail(email);
    }
*/
    public List<User> getAllUsers() {
        try {
			return userRep.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
    }
    public User getUserById(Integer userId) {
        return userRep.findById(userId).orElse(null);
    }

}
