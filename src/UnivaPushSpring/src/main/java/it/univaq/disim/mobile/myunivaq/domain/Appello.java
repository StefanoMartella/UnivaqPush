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
@Table(name = "appelli")
public class Appello {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_APPELLO", nullable = false)
	private Long id;
	
	@Column(name = "DATA_APPELLO", nullable = false)
	private Date dataAppello;
	
	@Column(name = "descrizione", nullable = false, length = 255)
	private String descrizione;
	
	@Enumerated(EnumType.STRING)
	private TipologiaEsame tipologiaEsame;
	
	@ManyToOne
	@PrimaryKeyJoinColumn
	private Insegnamento insegnamento;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getDataAppello() {
		return dataAppello;
	}
	public void setDataAppello(Date data) {
		this.dataAppello = data;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public TipologiaEsame getTipologiaEsame() {
		return tipologiaEsame;
	}
	public void setTipologiaEsame(TipologiaEsame tipologiaEsame) {
		this.tipologiaEsame = tipologiaEsame;
	}
	public Insegnamento getInsegnamento() {
		return insegnamento;
	}
	public void setInsegnamento(Insegnamento insegnamento) {
		this.insegnamento = insegnamento;
	}

	
}
