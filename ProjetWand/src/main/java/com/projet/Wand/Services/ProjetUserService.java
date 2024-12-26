package com.projet.Wand.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjetUserService {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Long> getProjetIdsForUser(Long userId) {
        String sql = "SELECT projet_id FROM projet_user WHERE user_id = ?";
        return jdbcTemplate.queryForList(sql, Long.class, userId);
    }
}
