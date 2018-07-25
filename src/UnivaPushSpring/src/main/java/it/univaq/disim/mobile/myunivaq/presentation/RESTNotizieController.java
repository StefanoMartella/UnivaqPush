package it.univaq.disim.mobile.myunivaq.presentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.univaq.disim.mobile.myunivaq.business.MyUnivaqService;
import it.univaq.disim.mobile.myunivaq.domain.Notizia;

@RestController
@RequestMapping("/api/notizie")
public class RESTNotizieController {
	
	@Autowired
	private MyUnivaqService service;
	
	@GetMapping
	public List<Notizia> list() {
		return service.findAllNotizie();
	}
	
	@GetMapping("/{id}")
	public Notizia findById(@PathVariable Long id) {
		return service.findNotiziaById(id);
	}

}
