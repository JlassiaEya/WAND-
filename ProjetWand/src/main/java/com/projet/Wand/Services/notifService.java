package com.projet.Wand.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.projet.Wand.Entity.Projet;
import com.projet.Wand.Entity.notification;
//import com.projet.Wand.Repository.ProjetRep;
import com.projet.Wand.Repository.notifRepository;



@Service
public class notifService {

    @Autowired
    private notifRepository notificationRepository;
    @Autowired
    private ProjetService projetS;
    

    public notification ajouterNotification(notification notification) {
        return notificationRepository.save(notification);
    }

    public notification recupererNotification(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    
    public List<notification> getNotificationsForUser(String destinataire) {
        return notificationRepository.findByDestinataire(destinataire);
    }
          
    public void supprimerNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
    public void acceptNotification(Long notificationId, Long projectId, Integer userId) {
        Optional<notification> optionalNotification = notificationRepository.findById(notificationId);    
        if (optionalNotification.isPresent()) {
            notification notification = optionalNotification.get();      
     
                projetS.addUserToProjet(projectId, userId);       
                notificationRepository.delete(notification);
            } else {
                throw new RuntimeException("Projet not found with ID: " + projectId);
            }
        
    }




}