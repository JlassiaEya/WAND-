package com.projet.Wand.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projet.Wand.Entity.Tache;

@Repository
public interface TacheRep extends JpaRepository<Tache, Long> {

    List<Tache> findByProjetId(Long id);
}
