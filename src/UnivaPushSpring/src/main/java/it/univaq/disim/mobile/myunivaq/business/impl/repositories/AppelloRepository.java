package it.univaq.disim.mobile.myunivaq.business.impl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.univaq.disim.mobile.myunivaq.domain.Appello;

public interface AppelloRepository extends JpaRepository<Appello, Long>{

	List<Appello> findAppelliByInsegnamentoId(long idInsegnamento);

}
