package it.univaq.disim.mobile.myunivaq.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "notizie")
public class Notizia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_NOTIZIA", nullable = false)
	private Long id;

	@Column(name = "NOME", nullable = false, length = 255)
	private String nome;

	@Column(name = "DESCRIZIONE", nullable = false, length = 255)
	private String descrizione;

	@Column(name = "DATA_PUBBLICAZIONE", nullable = false)
	private Date dataPubblicazione;

	@ManyToOne
	@PrimaryKeyJoinColumn
	private Utente pubblicatoDa;

	@ManyToOne
	@PrimaryKeyJoinColumn
	private TipologiaNotizia tipologia;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public Date getDataPubblicazione() {
		return dataPubblicazione;
	}

	public void setDataPubblicazione(Date dataPubblicazione) {
		this.dataPubblicazione = dataPubblicazione;
	}

	public Utente getPubblicatoDa() {
		return pubblicatoDa;
	}

	public void setPubblicatoDa(Utente pubblicatoDa) {
		this.pubblicatoDa = pubblicatoDa;
	}

	public TipologiaNotizia getTipologia() {
		return tipologia;
	}

	public void setTipologia(TipologiaNotizia tipologia) {
		this.tipologia = tipologia;
	}

}
