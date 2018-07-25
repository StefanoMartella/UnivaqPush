package it.univaq.disim.mobile.myunivaq.business.impl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.univaq.disim.mobile.myunivaq.domain.CorsoDiLaurea;
import it.univaq.disim.mobile.myunivaq.domain.Studente;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Long> {

	Utente findByUsername(String username);
	List<Studente> findAllByCorsoDiLaurea(CorsoDiLaurea corsoDiLaurea);
	
}
