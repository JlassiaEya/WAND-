package com.projet.Wand.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.Wand.Entity.User;

@Repository
public interface UserRep extends JpaRepository<User, Integer> {
	User findByEmail(String email);
	User findByEmailAndPassword(String email, String password);
	Optional<User> findById(Integer userId);
}
