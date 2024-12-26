package com.projet.Wand.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projet.Wand.Entity.Projet;
import com.projet.Wand.Entity.User;
import com.projet.Wand.Repository.ProjetRep;
import com.projet.Wand.Repository.UserRep;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {

    @Autowired
    private ProjetRep projectRepository;
    
    @Autowired
    private UserRep userrep;

    public List<Projet> getAllProjects() {
        return projectRepository.findAll();
    }

    public Projet createProject(Projet project) {
        project.setCreatedDate(new Date()); 
        return projectRepository.save(project);
    }

    public void deleteAllProjects() {
        projectRepository.deleteAll();
    }

    public List<Projet> getUserProjects(Integer userId) {
        return projectRepository.findByManagerId(userId);
    }
    
    public Projet getProjectDetails(Long projectId) {
        Optional<Projet> projectOptional = projectRepository.findById(projectId);
        return projectOptional.orElse(null);
    }
    
    public void addUserToProjet(Long projetId, Integer userId) {
        Optional<Projet> projetOptional = projectRepository.findById(projetId);
        Projet projet = projetOptional.orElseThrow(() -> new IllegalArgumentException("Projet non trouvé avec l'ID: " + projetId));

        Optional<User> userOptional = userrep.findById(userId);
        User user = userOptional.orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec l'ID: " + userId));

        projet.getMembers().add(user);

        projectRepository.save(projet);
    }
}
