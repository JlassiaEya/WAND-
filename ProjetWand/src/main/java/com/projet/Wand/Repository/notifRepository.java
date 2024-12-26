package com.projet.Wand.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projet.Wand.Entity.notification;

@Repository
public interface notifRepository extends JpaRepository<notification, Long> {
    List<notification> findByDestinataire(String destinataire);
}
