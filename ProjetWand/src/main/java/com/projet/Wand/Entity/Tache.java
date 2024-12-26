package com.projet.Wand.Entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String description;
    private Date dateDebut;
    private Date dateFinPrevue;
    private String assigneA;
    private String categorie;
    private String commentaires;

    @ManyToOne
    @JoinColumn(name = "projectId")
    private Projet projet;

    public Tache(){}
    
    public Tache(Long id, String nom, String description, Date dateDebut, Date dateFinPrevue, String assigneA,
			String categorie, String commentaires, Projet projet) {
		super();
		this.id = id;
		this.nom = nom;
		this.description = description;
		this.dateDebut = dateDebut;
		this.dateFinPrevue = dateFinPrevue;
		this.assigneA = assigneA;
		this.categorie = categorie;
		this.commentaires = commentaires;
		this.projet = projet;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFinPrevue() {
		return dateFinPrevue;
	}

	public void setDateFinPrevue(Date dateFinPrevue) {
		this.dateFinPrevue = dateFinPrevue;
	}

	public String getAssigneA() {
		return assigneA;
	}

	public void setAssigneA(String assigneA) {
		this.assigneA = assigneA;
	}

	public String getCategorie() {
		return categorie;
	}

	public void setCategorie(String categorie) {
		this.categorie = categorie;
	}

	public String getCommentaires() {
		return commentaires;
	}

	public void setCommentaires(String commentaires) {
		this.commentaires = commentaires;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}

	@Override
	public String toString() {
		return "Tache [id=" + id + ", nom=" + nom + ", description=" + description + ", dateDebut=" + dateDebut
				+ ", dateFinPrevue=" + dateFinPrevue + ", assigneA=" + assigneA + ", categorie=" + categorie
				+ ", commentaires=" + commentaires + ", projet=" + projet + "]";
	}
    
}