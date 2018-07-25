package it.univaq.disim.mobile.myunivaq.business.impl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.univaq.disim.mobile.myunivaq.domain.PrenotazioneAppello;

public interface PrenotazioneAppelloRepository extends JpaRepository<PrenotazioneAppello, Long>{
	
	List<PrenotazioneAppello> findPrenotazioneAppelliByUtenteIdAndInsegnamentoId(Long idUtente, Long insegnamentoId);

}
