package it.univaq.disim.mobile.myunivaq.domain;

import java.util.Date;

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

@Entity
@Table(name = "tasse")
public class Tassa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_TASSA", nullable = false)
	private Long id;
	
	@Column(name = "DATA_SCADENZA", nullable = false)
	private Date dataScadenza;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private Utente utente;
	
	@Column(name = "IMPORTO", nullable = false)
	private Double importo;
	
	@Enumerated(EnumType.STRING)
	private StatoTassa statoTassa;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDataScadenza() {
		return dataScadenza;
	}

	public void setDataScadenza(Date dataScadenza) {
		this.dataScadenza = dataScadenza;
	}

	public Utente getUtente() {
		return utente;
	}

	public void setUtente(Utente utente) {
		this.utente = utente;
	}

	public Double getImporto() {
		return importo;
	}

	public void setImporto(Double importo) {
		this.importo = importo;
	}

	public StatoTassa getStatoTassa() {
		return statoTassa;
	}

	public void setStatoTassa(StatoTassa statoTassa) {
		this.statoTassa = statoTassa;
	}
	
}
