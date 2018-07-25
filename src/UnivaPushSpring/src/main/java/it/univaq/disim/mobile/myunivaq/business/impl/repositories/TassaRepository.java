package it.univaq.disim.mobile.myunivaq.business.impl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.univaq.disim.mobile.myunivaq.domain.Tassa;

public interface TassaRepository extends JpaRepository<Tassa, Long>{
	
	List<Tassa> findTasseByUtenteId(Long idUtente);

}
