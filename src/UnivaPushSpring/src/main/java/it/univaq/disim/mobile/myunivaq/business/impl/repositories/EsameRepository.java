package it.univaq.disim.mobile.myunivaq.business.impl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.univaq.disim.mobile.myunivaq.domain.Esame;

public interface EsameRepository extends JpaRepository<Esame, Long>{
	
	List<Esame> findEsamiByUtenteId(Long idUtente);

}
