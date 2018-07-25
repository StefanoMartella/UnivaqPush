package it.univaq.disim.mobile.myunivaq.business.impl.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import it.univaq.disim.mobile.myunivaq.domain.Insegnamento;

public interface InsegnamentoRepository extends JpaRepository<Insegnamento, Long>{

	Insegnamento findInsegnamentoById(Long idInsegnamento);
	List<Insegnamento> findInsegnamentiByDocenteId(Long idDocente, Sort sort);

}
