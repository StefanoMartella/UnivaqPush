package it.univaq.disim.mobile.myunivaq.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@DiscriminatorValue("studente")
public class Studente extends Utente {

	@ManyToOne
	@PrimaryKeyJoinColumn
	private CorsoDiLaurea corsoDiLaurea;

	public CorsoDiLaurea getCorsoDiLaurea() {
		return corsoDiLaurea;
	}

	public void setCorsoDiLaurea(CorsoDiLaurea corsoDiLaurea) {
		this.corsoDiLaurea = corsoDiLaurea;
	}
	
	
	
}
