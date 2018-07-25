package it.univaq.disim.mobile.myunivaq.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "prenotazioni_appelli")
public class PrenotazioneAppello {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PRENOTAZIONE_APPELLO", nullable = false)
	private Long id;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private Utente utente;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Insegnamento insegnamento;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Appello appello;

	@Enumerated(EnumType.STRING)
	private StatoPrenotazione statoPrenotazione = StatoPrenotazione.NON_PRENOTATO;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Utente getUtente() {
		return utente;
	}

	public void setUtente(Utente utente) {
		this.utente = utente;
	}

	public Insegnamento getInsegnamento() {
		return insegnamento;
	}

	public void setInsegnamento(Insegnamento insegnamento) {
		this.insegnamento = insegnamento;
	}

	public Appello getAppello() {
		return appello;
	}

	public void setAppello(Appello appello) {
		this.appello = appello;
	}

	public StatoPrenotazione getStatoPrenotazione() {
		return statoPrenotazione;
	}

	public void setStatoPrenotazione(StatoPrenotazione statoPrenotazione) {
		this.statoPrenotazione = statoPrenotazione;
	}	

}
