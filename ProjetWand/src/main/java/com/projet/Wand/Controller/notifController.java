package com.projet.Wand.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.projet.Wand.Entity.notification;
import com.projet.Wand.Services.notifService;

@RestController
@RequestMapping("/notifications")
public class notifController {

    @Autowired
    private notifService notificationService;

    @PostMapping("/creer")
    public notification ajouterNotification(@RequestBody notification notification) {
        return notificationService.ajouterNotification(notification);
    }

    @GetMapping("/{id}")
    public notification recupererNotification(@PathVariable Long id) {
        return notificationService.recupererNotification(id);
    }

    @GetMapping("/user/{destinataire}")
    public List<notification> getNotificationsForUser(@PathVariable String destinataire) {
        return notificationService.getNotificationsForUser(destinataire);
    }
    @DeleteMapping("/{id}")
    public void supprimerNotification(@PathVariable Long id) {
        notificationService.supprimerNotification(id);
    }
  
    @PostMapping("/accepter-notification/{notificationId}/{projectId}/{userId}")
    public void accepterNotification(@PathVariable Long notificationId, @PathVariable Long projectId, @PathVariable Integer userId) {
        notificationService.acceptNotification(notificationId, projectId, userId);
    }


}
