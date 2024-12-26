package com.projet.Wand.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projet.Wand.Entity.Projet;

@Repository
public interface ProjetRep extends JpaRepository<Projet, Long> {
	List<Projet> findByManagerId(Integer managerId);}

