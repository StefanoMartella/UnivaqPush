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

@Entity
@Table(name = "insegnamenti")
public class Insegnamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_INSEGNAMENTO", nullable = false)
	private Long id;

	@Column(name = "CODICE", nullable = false, length = 255)
	private String codice;

	@Column(name = "DENOMINAZIONE", nullable = false, length = 255)
	private String denominazione;

	@Enumerated(EnumType.STRING)
	private Lingua lingua;
	
	@Column(name = "cfu", nullable = false)
	private int cfu;
	
	@Enumerated(EnumType.STRING)
	private TipologiaCredito tipologiaCredito;
	
	@Column(name = "PERIODO_INSEGNAMENTO", nullable = false)
	private int periodoInsegnamento;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private CorsoDiLaurea corsoDiLaurea;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private Docente docente;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCodice() {
		return codice;
	}

	public void setCodice(String codice) {
		this.codice = codice;
	}

	public String getDenominazione() {
		return denominazione;
	}

	public void setDenominazione(String denominazione) {
		this.denominazione = denominazione;
	}

	public Lingua getLingua() {
		return lingua;
	}

	public void setLingua(Lingua lingua) {
		this.lingua = lingua;
	}

	public int getCfu() {
		return cfu;
	}

	public void setCfu(int cfu) {
		this.cfu = cfu;
	}

	public TipologiaCredito getTipologiaCredito() {
		return tipologiaCredito;
	}

	public void setTipologiaCredito(TipologiaCredito tipologiaCredito) {
		this.tipologiaCredito = tipologiaCredito;
	}

	public int getPeriodoInsegnamento() {
		return periodoInsegnamento;
	}

	public void setPeriodoInsegnamento(int periodoInsegnamento) {
		this.periodoInsegnamento = periodoInsegnamento;
	}

	public CorsoDiLaurea getCorsoDiLaurea() {
		return corsoDiLaurea;
	}

	public void setCorsoDiLaurea(CorsoDiLaurea corsoDiLaurea) {
		this.corsoDiLaurea = corsoDiLaurea;
	}

	public Docente getDocente() {
		return docente;
	}

	public void setDocente(Docente docente) {
		this.docente = docente;
	}
	
	
	
	
	

}
