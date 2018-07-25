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
@Table(name = "esami")
public class Esame {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_ESAME", nullable = false)
	private Long id;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private Utente utente;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private Insegnamento insegnamento;
	
	@Enumerated(EnumType.STRING)
	private StatoEsame statoEsame;
	
	@Column(name = "DATA_ESAME", nullable = true)
	private Date dataEsame;
	
	@Column(name = "VOTO", nullable = true)
	private Integer voto;

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

	public StatoEsame getStatoEsame() {
		return statoEsame;
	}

	public void setStatoEsame(StatoEsame statoEsame) {
		this.statoEsame = statoEsame;
	}

	public Date getDataEsame() {
		return dataEsame;
	}

	public void setDataEsame(Date dataEsame) {
		this.dataEsame = dataEsame;
	}

	public Integer getVoto() {
		return voto;
	}

	public void setVoto(Integer voto) {
		this.voto = voto;
	}

}
