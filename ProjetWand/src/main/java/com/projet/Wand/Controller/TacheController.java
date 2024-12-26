package com.projet.Wand.Controller;

import com.projet.Wand.Entity.Projet;
import com.projet.Wand.Entity.Tache;
import com.projet.Wand.Services.TacheService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/taches") 
public class TacheController {
    private  TacheService tacheService;

    @Autowired
    public TacheController(TacheService tacheService) {
        this.tacheService = tacheService;
    }

    @PostMapping("/creer")
    public ResponseEntity<Tache> creerTache(@RequestBody Tache tache) {
        try {
            Tache newTache = tacheService.creerTache(tache);
            return ResponseEntity.ok(newTache); // Retourne la nouvelle tâche créée avec le statut 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retourne une erreur 500 en cas d'exception
        }
    }
    //recuperer tache par projetId!
 
    @GetMapping("/{id}")
    public ResponseEntity<List<Tache>> recupererTacheParId(@PathVariable Long id) {
        List<Tache> taches = tacheService.recupererTachesParIdProjet(id);
        return ResponseEntity.ok(taches);
    }
    }
