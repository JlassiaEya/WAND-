package com.projet.Wand.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projet.Wand.Entity.Projet;
import com.projet.Wand.Services.ProjetService;
import com.projet.Wand.Services.ProjetUserService;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/projets") 
public class ProjetController {
    @Autowired
    private ProjetService projectService;
    
    @Autowired
    private ProjetUserService projetUserService;

  @GetMapping
    public ResponseEntity<List<Projet>> getAllProjects() {
        List<Projet> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

  @PostMapping 
  public ResponseEntity<Projet> createProject(@RequestBody Projet project) {
      Projet newProject = projectService.createProject(project);
      return ResponseEntity.ok(newProject);
  }


    @DeleteMapping
    public ResponseEntity<String> deleteAllProjects() {
        projectService.deleteAllProjects();
        return ResponseEntity.ok("All projects deleted successfully");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Projet>> getUserProjects(@PathVariable Integer userId) {
        List<Projet> userProjects = projectService.getUserProjects(userId);
        return ResponseEntity.ok(userProjects);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Projet> getProjectDetails(@PathVariable("id") Long id) {
   
        Projet projet = projectService.getProjectDetails(id);
        if (projet != null) {
            return ResponseEntity.ok(projet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/utilisateur/{userId}")
    public ResponseEntity<List<Projet>> getProjetsForUtilisateur(@PathVariable Long userId) {
        List<Long> projetIds = projetUserService.getProjetIdsForUser(userId);
        List<Projet> projets = new ArrayList<>();
        for (Long projetId : projetIds) {
            Projet projet = projectService.getProjectDetails(projetId);
            if (projet != null) {
                projets.add(projet);
            }
        }
        return ResponseEntity.ok().body(projets);
    }
}
