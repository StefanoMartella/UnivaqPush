package it.univaq.disim.mobile.myunivaq.presentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.univaq.disim.mobile.myunivaq.business.MyUnivaqService;
import it.univaq.disim.mobile.myunivaq.common.Utility;
import it.univaq.disim.mobile.myunivaq.domain.Appello;
import it.univaq.disim.mobile.myunivaq.domain.Insegnamento;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

@RestController
@RequestMapping("/api/insegnamenti")
public class RESTInsegnamentiController {

	@Autowired
	private MyUnivaqService service;
	
	@GetMapping
	public List<Insegnamento> list() {
		Utente utente = Utility.getUtente();
		return service.findAllInsegnamenti(utente);
	}
	
	@GetMapping("/{idInsegnamento}/appelli")
	public List<Appello> list(@PathVariable long idInsegnamento) {
		return service.findAllAppelli(idInsegnamento);
	}
	
	
}
