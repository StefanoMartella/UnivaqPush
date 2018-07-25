package it.univaq.disim.mobile.myunivaq.business.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.univaq.disim.mobile.myunivaq.business.BusinessException;
import it.univaq.disim.mobile.myunivaq.business.MyUnivaqService;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.AppelloRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.CorsoDiLaureaRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.EsameRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.InsegnamentoRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.NotiziaRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.PrenotazioneAppelloRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.TassaRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.UtenteRepository;
import it.univaq.disim.mobile.myunivaq.domain.Appello;
import it.univaq.disim.mobile.myunivaq.domain.CorsoDiLaurea;
import it.univaq.disim.mobile.myunivaq.domain.Esame;
import it.univaq.disim.mobile.myunivaq.domain.Insegnamento;
import it.univaq.disim.mobile.myunivaq.domain.Notizia;
import it.univaq.disim.mobile.myunivaq.domain.PrenotazioneAppello;
import it.univaq.disim.mobile.myunivaq.domain.Studente;
import it.univaq.disim.mobile.myunivaq.domain.Tassa;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

@Service
@Transactional
public class MyUnivaqServiceImpl implements MyUnivaqService {

	@Autowired
	private UtenteRepository utenteRepository;

	@Autowired
	private NotiziaRepository notiziaRepository;

	@Autowired
	private InsegnamentoRepository insegnamentoRepository;

	@Autowired
	private AppelloRepository appelloRepository;
	
	@Autowired
	private TassaRepository tassaRepository;
	
	@Autowired
	private EsameRepository esameRepository;
	
	@Autowired
	private PrenotazioneAppelloRepository prenotazioneAppelloRepository;
	
	@Autowired
	private CorsoDiLaureaRepository corsoDiLaureaRepository;

	@Override
	public Utente findUtenteByUsername(String username) throws BusinessException {
		return utenteRepository.findByUsername(username);
	}

	@Override
	public List<Notizia> findAllNotizie() throws BusinessException {
		return notiziaRepository.findAll(JpaSort.unsafe(Direction.DESC, "dataPubblicazione"));
	}

	@Override
	public Notizia findNotiziaById(Long id) throws BusinessException {
		return notiziaRepository.findById(id).get();
	}
	
	@Override
	public CorsoDiLaurea findCorsoDiLaureaById(Long id) throws BusinessException {
		return corsoDiLaureaRepository.findById(id).get();
	}
	
	@Override
	public Tassa findTassaById(Long id) throws BusinessException {
		return tassaRepository.findById(id).get();
	}

	@Override
	public Utente updateProfilo(Utente profilo) throws BusinessException {
		Utente utente = utenteRepository.findByUsername(profilo.getUsername());
		utente.setEmail(profilo.getEmail());
		utente.setTelefono(profilo.getTelefono());
		return utente;
	}

	@Override
	public List<Insegnamento> findAllInsegnamenti(Utente utente) throws BusinessException {
		return insegnamentoRepository.findInsegnamentiByDocenteId(utente.getId(), JpaSort.unsafe(Direction.ASC, "denominazione"));
	}

	@Override
	public List<Appello> findAllAppelli(long idInsegnamento) throws BusinessException {
		return appelloRepository.findAppelliByInsegnamentoId(idInsegnamento);
	}

	@Override
	public void createAppello(Appello appello) throws BusinessException {
		appelloRepository.save(appello);		
	}

	@Override
	public Appello findAppelloById(long idAppello) throws BusinessException {
		return appelloRepository.findById(idAppello).get();
	}

	@Override
	public void updateAppello(Appello appello) throws BusinessException {
		appelloRepository.save(appello);
	}

	@Override
	public void deleteAppello(long idAppello) throws BusinessException {
		appelloRepository.deleteById(idAppello);
		
	}
	
	@Override
	public List<Tassa> findAllTasse(Utente utente) throws BusinessException {
		return tassaRepository.findTasseByUtenteId(utente.getId());
	}
	
	@Override
	public List<Esame> findAllEsami(Utente utente) throws BusinessException {
		return esameRepository.findEsamiByUtenteId(utente.getId());
	}
	
	@Override
	public List<PrenotazioneAppello> findAllPrenotazioneAppelli(Utente utente, Long insegnamentoId) throws BusinessException {
		return prenotazioneAppelloRepository.findPrenotazioneAppelliByUtenteIdAndInsegnamentoId(utente.getId(), insegnamentoId);
	}
	
	@Override
	public void createPrenotazioneAppello(PrenotazioneAppello prenotazioneAppello) throws BusinessException {
		prenotazioneAppelloRepository.save(prenotazioneAppello);		
	}
	
	@Override
	public void updatePrenotazioneAppello(PrenotazioneAppello prenotazioneAppello) throws BusinessException {
		prenotazioneAppelloRepository.save(prenotazioneAppello);
	}
	
	@Override
	public List<Studente> findAllByCorsoDiLaurea(CorsoDiLaurea corsoDiLaurea) throws BusinessException{
		return utenteRepository.findAllByCorsoDiLaurea(corsoDiLaurea);
	}
	
	@Override
	public Insegnamento findInsegnamentoById(Long idInsegnamento) {
		return insegnamentoRepository.findInsegnamentoById(idInsegnamento);
	}

}
