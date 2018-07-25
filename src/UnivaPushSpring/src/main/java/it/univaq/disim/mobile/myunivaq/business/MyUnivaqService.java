package it.univaq.disim.mobile.myunivaq.business;

import java.util.List;

import it.univaq.disim.mobile.myunivaq.domain.Appello;
import it.univaq.disim.mobile.myunivaq.domain.CorsoDiLaurea;
import it.univaq.disim.mobile.myunivaq.domain.Insegnamento;
import it.univaq.disim.mobile.myunivaq.domain.Notizia;
import it.univaq.disim.mobile.myunivaq.domain.PrenotazioneAppello;
import it.univaq.disim.mobile.myunivaq.domain.Studente;
import it.univaq.disim.mobile.myunivaq.domain.Tassa;
import it.univaq.disim.mobile.myunivaq.domain.Esame;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

public interface MyUnivaqService {

	Utente findUtenteByUsername(String username) throws BusinessException;

	Utente updateProfilo(Utente utente) throws BusinessException;

	List<Notizia> findAllNotizie() throws BusinessException;

	Notizia findNotiziaById(Long id) throws BusinessException;
	
	CorsoDiLaurea findCorsoDiLaureaById(Long id) throws BusinessException;

	List<Insegnamento> findAllInsegnamenti(Utente utente) throws BusinessException;

	List<Appello> findAllAppelli(long idInsegnamento) throws BusinessException;

	void createAppello(Appello appello) throws BusinessException;

	Appello findAppelloById(long idAppello) throws BusinessException;

	void updateAppello(Appello appello) throws BusinessException;

	void deleteAppello(long idAppello) throws BusinessException;
	
	Tassa findTassaById(Long id) throws BusinessException;
	
	List<Tassa> findAllTasse(Utente utente) throws BusinessException;
	
	List<Esame> findAllEsami(Utente utente) throws BusinessException;
	
	List<PrenotazioneAppello> findAllPrenotazioneAppelli(Utente utente, Long insegnamentoId) throws BusinessException;
	
	void createPrenotazioneAppello(PrenotazioneAppello prenotazioneAppello) throws BusinessException;
	
	void updatePrenotazioneAppello(PrenotazioneAppello prenotazioneAppello) throws BusinessException;
	
	List<Studente> findAllByCorsoDiLaurea(CorsoDiLaurea corsoDiLaurea) throws BusinessException;
	
	Insegnamento findInsegnamentoById(Long idInsegnamento) throws BusinessException;
	
}
