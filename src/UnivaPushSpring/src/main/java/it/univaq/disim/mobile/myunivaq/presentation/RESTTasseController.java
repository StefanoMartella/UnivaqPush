package it.univaq.disim.mobile.myunivaq.presentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.univaq.disim.mobile.myunivaq.business.MyUnivaqService;
import it.univaq.disim.mobile.myunivaq.common.Utility;
import it.univaq.disim.mobile.myunivaq.domain.Tassa;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

@RestController
@RequestMapping("/api/tasse")
public class RESTTasseController {

	@Autowired
	private MyUnivaqService service;
	
	@GetMapping
	public List<Tassa> list() {
		//Utente utente = new Utente();
		//utente.setId(new Long(3));
		Utente utente = Utility.getUtente();
		return service.findAllTasse(utente);
	}
	
	@GetMapping("/{id}")
	public Tassa findById(@PathVariable Long id) {
		return service.findTassaById(id);
	}
	
}
