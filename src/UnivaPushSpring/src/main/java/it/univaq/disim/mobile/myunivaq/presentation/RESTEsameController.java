package it.univaq.disim.mobile.myunivaq.presentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.univaq.disim.mobile.myunivaq.business.MyUnivaqService;
import it.univaq.disim.mobile.myunivaq.common.Utility;
import it.univaq.disim.mobile.myunivaq.domain.Esame;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

@RestController
@RequestMapping("/api/esami")
public class RESTEsameController {
	
	@Autowired
	private MyUnivaqService service;
	
	@GetMapping
	public List<Esame> list() {
		Utente utente = Utility.getUtente();
		return service.findAllEsami(utente);
	}

}
