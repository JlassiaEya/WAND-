package com.projet.Wand.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.Wand.Entity.Tache;
import com.projet.Wand.Repository.*;

@Service
public class TacheService {
    @Autowired
    private TacheRep tacheRep; 
    
    
    public Tache creerTache(Tache tache) {
      return  tacheRep.save(tache); 
    }
    public List<Tache> recupererTachesParIdProjet(Long idProjet) {
        return tacheRep.findByProjetId(idProjet); 
    }
   
}
