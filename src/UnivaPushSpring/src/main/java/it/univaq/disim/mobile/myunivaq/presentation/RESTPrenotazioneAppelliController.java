package it.univaq.disim.mobile.myunivaq.presentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import it.univaq.disim.mobile.myunivaq.business.MyUnivaqService;
import it.univaq.disim.mobile.myunivaq.common.Utility;
import it.univaq.disim.mobile.myunivaq.domain.PrenotazioneAppello;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

@RestController
@RequestMapping("/api/prenotazioneappello")
public class RESTPrenotazioneAppelliController {
	
	@Autowired
	private MyUnivaqService service;
	
	@GetMapping("/{insegnamentoId}")
	public List<PrenotazioneAppello> list(@PathVariable Long insegnamentoId) {
		Utente utente = Utility.getUtente();
		return service.findAllPrenotazioneAppelli(utente, insegnamentoId);
	}
	
	@PutMapping
	public void updatePrenotazioneAppello(@RequestBody PrenotazioneAppello prenotazioneAppello) {
		service.updatePrenotazioneAppello(prenotazioneAppello);
	}

}
