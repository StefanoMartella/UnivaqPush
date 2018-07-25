package it.univaq.disim.mobile.myunivaq;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import it.univaq.disim.mobile.myunivaq.business.impl.repositories.AppelloRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.CorsoDiLaureaRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.EsameRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.InsegnamentoRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.NotiziaRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.PrenotazioneAppelloRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.TipologiaNotiziaRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.UtenteRepository;
import it.univaq.disim.mobile.myunivaq.business.impl.repositories.TassaRepository;
import it.univaq.disim.mobile.myunivaq.domain.Appello;
import it.univaq.disim.mobile.myunivaq.domain.CorsoDiLaurea;
import it.univaq.disim.mobile.myunivaq.domain.Esame;
import it.univaq.disim.mobile.myunivaq.domain.Docente;
import it.univaq.disim.mobile.myunivaq.domain.Insegnamento;
import it.univaq.disim.mobile.myunivaq.domain.Lingua;
import it.univaq.disim.mobile.myunivaq.domain.StatoTassa;
import it.univaq.disim.mobile.myunivaq.domain.PrenotazioneAppello;
import it.univaq.disim.mobile.myunivaq.domain.StatoEsame;
import it.univaq.disim.mobile.myunivaq.domain.Studente;
import it.univaq.disim.mobile.myunivaq.domain.Tassa;
import it.univaq.disim.mobile.myunivaq.domain.TipologiaCredito;
import it.univaq.disim.mobile.myunivaq.domain.TipologiaEsame;
import it.univaq.disim.mobile.myunivaq.domain.TipologiaNotizia;
import it.univaq.disim.mobile.myunivaq.domain.Notizia;

@SpringBootApplication
public class MyUnivaqApplication {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	public CommandLineRunner loadData(UtenteRepository utenteRepository, 
									  NotiziaRepository notiziaRepository,
									  TipologiaNotiziaRepository tipologiaNotiziaRepository, 
									  CorsoDiLaureaRepository corsoDiLaureaRepository, 
									  InsegnamentoRepository insegnamentoRepository, 
									  AppelloRepository appelloRepository, 
									  TassaRepository tassaRepository, 
									  EsameRepository esameRepository,
									  PrenotazioneAppelloRepository prenotazioneAppelloRepository) {
		return (args) -> {

			TipologiaNotizia tipologiaDidattica = new TipologiaNotizia();
			tipologiaDidattica.setNome("Didattica");
			tipologiaDidattica = tipologiaNotiziaRepository.save(tipologiaDidattica);

			TipologiaNotizia tipologiaLavoro = new TipologiaNotizia();
			tipologiaLavoro.setNome("Lavoro");
			tipologiaLavoro = tipologiaNotiziaRepository.save(tipologiaLavoro);

			CorsoDiLaurea corsoDiLaureaInformatica = new CorsoDiLaurea();
			corsoDiLaureaInformatica.setClasse("L-31");
			corsoDiLaureaInformatica.setNome("Informatica");
			corsoDiLaureaInformatica = corsoDiLaureaRepository.save(corsoDiLaureaInformatica);

			CorsoDiLaurea corsoDiLaureaMaster = new CorsoDiLaurea();
			corsoDiLaureaMaster.setClasse("L-32");
			corsoDiLaureaMaster.setNome("Master Web Technology");
			corsoDiLaureaMaster = corsoDiLaureaRepository.save(corsoDiLaureaMaster);
			
			Docente amleto = new Docente();
			amleto.setUsername("amleto");
			amleto.setPassword(passwordEncoder.encode("amleto"));
			amleto.setNome("Amleto");
			amleto.setCognome("Di Salle");
			amleto.setEmail("amleto.disalle@univaq.it");
			amleto.setMatricola("09999");
			amleto.setTelefono("+39.0862/433735");
			amleto = utenteRepository.save(amleto);
			
			Docente marco = new Docente();
			marco.setUsername("marco");
			marco.setPassword(passwordEncoder.encode("marco"));
			marco.setNome("Marco");
			marco.setCognome("Autili");
			marco.setEmail("marco.autili@univaq.it");
			marco.setMatricola("01111");
			marco.setTelefono("+39.0862/433xxx");
			marco = utenteRepository.save(marco);			

			Studente stefano = new Studente();
			stefano.setUsername("stefanmarte");
			stefano.setPassword(passwordEncoder.encode("stefanmarte"));
			stefano.setNome("Stefano");
			stefano.setCognome("Martella");
			stefano.setEmail("stefano.martella@student.univaq.it");
			stefano.setMatricola("243848");
			stefano.setCorsoDiLaurea(corsoDiLaureaInformatica);
			stefano = utenteRepository.save(stefano);
			
			Studente studente = new Studente();
			studente.setUsername("studente");
			studente.setPassword(passwordEncoder.encode("studente"));
			studente.setNome("Studente");
			studente.setCognome("Studente");
			studente.setEmail("nome.cognome@student.univaq.it");
			studente.setMatricola("224455");
			studente.setCorsoDiLaurea(corsoDiLaureaInformatica);
			studente = utenteRepository.save(studente);

			for (int i = 0; i < 10; i++) {
				Notizia notizia = new Notizia();
				notizia.setNome("Lezioni del corso " + i);
				notizia.setDescrizione("Le lezioni di " + i + "  comprese nel periodo 11-24 Maggio 2018 si svolgeranno secondo il seguente calendario:");
				Date dataPubblicazione = new Date(System.currentTimeMillis() - (i * 86400000));
				notizia.setDataPubblicazione(dataPubblicazione);
				notizia.setPubblicatoDa(amleto);
				notizia.setTipologia(tipologiaDidattica);
				notiziaRepository.save(notizia);
			}

			Insegnamento mobile = new Insegnamento();
			mobile.setCodice("F1081");
			mobile.setDenominazione("Applicazioni per Dispositivi Mobili");
			mobile.setLingua(Lingua.ITA);
			mobile.setCfu(6);
			mobile.setTipologiaCredito(TipologiaCredito.b);
			mobile.setPeriodoInsegnamento(2);
			mobile.setCorsoDiLaurea(corsoDiLaureaInformatica);
			mobile.setDocente(amleto);
			insegnamentoRepository.save(mobile);

			Appello appelloGiugno = new Appello();
			appelloGiugno.setDescrizione("1 appello Giugno");
			appelloGiugno.setDataAppello(new Date(System.currentTimeMillis() + (20 * 86400000)));
			appelloGiugno.setInsegnamento(mobile);
			appelloGiugno.setTipologiaEsame(TipologiaEsame.ORALE);
			appelloRepository.save(appelloGiugno);

			Appello appelloGiugno2 = new Appello();
			appelloGiugno2.setDescrizione("2 appello Giugno");
			appelloGiugno2.setDataAppello(new Date(System.currentTimeMillis() + (35 * 86400000)));
			appelloGiugno2.setInsegnamento(mobile);
			appelloGiugno2.setTipologiaEsame(TipologiaEsame.ORALE);
			appelloRepository.save(appelloGiugno2);
			
			Insegnamento java = new Insegnamento();
			java.setCodice("F7W027");
			java.setDenominazione("Programmazione avanzata Java");
			java.setLingua(Lingua.ITA);
			java.setCfu(5);
			java.setTipologiaCredito(TipologiaCredito.b);
			java.setPeriodoInsegnamento(1);
			//java.setCorsoDiLaurea(corsoDiLaureaMaster);
			java.setCorsoDiLaurea(corsoDiLaureaInformatica);
			java.setDocente(amleto);
			insegnamentoRepository.save(java);
			
			Appello appelloLuglio = new Appello();
			appelloLuglio.setDescrizione("1 appello Luglio");
			appelloLuglio.setDataAppello(new Date(System.currentTimeMillis() + (20 * 86400000)));
			appelloLuglio.setInsegnamento(java);
			appelloLuglio.setTipologiaEsame(TipologiaEsame.ORALE);
			appelloRepository.save(appelloLuglio);

			Appello appelloLuglio2 = new Appello();
			appelloLuglio2.setDescrizione("2 appello Luglio");
			appelloLuglio2.setDataAppello(new Date(System.currentTimeMillis() + (35 * 86400000)));
			appelloLuglio2.setInsegnamento(java);
			appelloLuglio2.setTipologiaEsame(TipologiaEsame.ORALE);
			appelloRepository.save(appelloLuglio2);

			Insegnamento jee = new Insegnamento();
			jee.setCodice("F7W021");
			jee.setDenominazione("Piattaforma JEE");
			jee.setLingua(Lingua.ITA);
			jee.setCfu(6);
			jee.setTipologiaCredito(TipologiaCredito.b);
			jee.setPeriodoInsegnamento(2);
			jee.setCorsoDiLaurea(corsoDiLaureaMaster);
			jee.setDocente(amleto);
			insegnamentoRepository.save(jee);
			
			Appello appelloLuglio3 = new Appello();
			appelloLuglio3.setDescrizione("1 appello Luglio");
			appelloLuglio3.setDataAppello(new Date(System.currentTimeMillis() + (35 * 86400000)));
			appelloLuglio3.setInsegnamento(jee);
			appelloLuglio3.setTipologiaEsame(TipologiaEsame.SCRITTO);
			appelloRepository.save(appelloLuglio3);
			
			Insegnamento laboratoriosistemioperativi = new Insegnamento();
			laboratoriosistemioperativi.setCodice("F1I021");
			laboratoriosistemioperativi.setDenominazione("Laboratorio di Sistemi Operativi");
			laboratoriosistemioperativi.setLingua(Lingua.ITA);
			laboratoriosistemioperativi.setCfu(6);
			laboratoriosistemioperativi.setTipologiaCredito(TipologiaCredito.b);
			laboratoriosistemioperativi.setPeriodoInsegnamento(1);
			laboratoriosistemioperativi.setCorsoDiLaurea(corsoDiLaureaInformatica);
			laboratoriosistemioperativi.setDocente(marco);
			insegnamentoRepository.save(laboratoriosistemioperativi);
			
			Appello appelloGiugno3 = new Appello();
			appelloGiugno3.setDescrizione("1 appello Giugno");
			appelloGiugno3.setDataAppello(new Date(System.currentTimeMillis() + (35 * 86400000)));
			appelloGiugno3.setInsegnamento(laboratoriosistemioperativi);
			appelloGiugno3.setTipologiaEsame(TipologiaEsame.SCRITTO);
			appelloRepository.save(appelloGiugno3);
			
			Appello appelloGiugno4 = new Appello();
			appelloGiugno4.setDescrizione("2 appello Giugno");
			appelloGiugno4.setDataAppello(new Date(System.currentTimeMillis() + (35 * 86400000)));
			appelloGiugno4.setInsegnamento(laboratoriosistemioperativi);
			appelloGiugno4.setTipologiaEsame(TipologiaEsame.SCRITTO);
			appelloRepository.save(appelloGiugno4);
			
			Tassa tassa1 = new Tassa();
			tassa1.setDataScadenza(new Date(System.currentTimeMillis() + (35 * 86400000)));
			tassa1.setImporto(128.50);
			tassa1.setUtente(stefano);
			tassa1.setStatoTassa(StatoTassa.PAGATA);
			tassaRepository.save(tassa1);
			
			Tassa tassa2 = new Tassa();
			tassa2.setDataScadenza(new Date(System.currentTimeMillis() + (35 * 86400000)));
			tassa2.setImporto(250.50);
			tassa2.setUtente(stefano);
			tassa2.setStatoTassa(StatoTassa.NON_PAGATA);
			tassaRepository.save(tassa2);
			
			Tassa tassa3 = new Tassa();
			tassa3.setDataScadenza(new Date(System.currentTimeMillis() + (35 * 86400000)));
			tassa3.setImporto(250.50);
			tassa3.setUtente(stefano);
			tassa3.setStatoTassa(StatoTassa.PAGATA);
			tassaRepository.save(tassa3);
			
			Esame esame1 = new Esame();
			esame1.setDataEsame(new Date(System.currentTimeMillis() + (35 * 86400000)));
			esame1.setStatoEsame(StatoEsame.SUPERATO);
			esame1.setInsegnamento(mobile);
			esame1.setUtente(stefano);
			esame1.setVoto(30);
			esameRepository.save(esame1);
			
			Esame esame2 = new Esame();
			esame2.setDataEsame(null);
			esame2.setStatoEsame(StatoEsame.FREQUENTATO);
			esame2.setInsegnamento(java);
			esame2.setUtente(stefano);
			esame2.setVoto(null);
			esameRepository.save(esame2);
			
			Esame esame3 = new Esame();
			esame3.setDataEsame(null);
			esame3.setStatoEsame(StatoEsame.PIANIFICATO);
			esame3.setInsegnamento(laboratoriosistemioperativi);
			esame3.setUtente(stefano);
			esame3.setVoto(null);
			esameRepository.save(esame3);
			
			Esame esame4 = new Esame();
			esame4.setDataEsame(new Date(System.currentTimeMillis() + (35 * 86400000)));
			esame4.setStatoEsame(StatoEsame.SUPERATO);
			esame4.setInsegnamento(jee);
			esame4.setUtente(stefano);
			esame4.setVoto(30);
			esameRepository.save(esame4);
			
			PrenotazioneAppello prenotazione1 = new PrenotazioneAppello();
			prenotazione1.setAppello(appelloLuglio);
			prenotazione1.setUtente(stefano);
			prenotazione1.setInsegnamento(java);
			prenotazioneAppelloRepository.save(prenotazione1);
			
			PrenotazioneAppello prenotazione2 = new PrenotazioneAppello();
			prenotazione2.setAppello(appelloGiugno3);
			prenotazione2.setUtente(stefano);
			prenotazione2.setInsegnamento(laboratoriosistemioperativi);
			prenotazioneAppelloRepository.save(prenotazione2);
			
			PrenotazioneAppello prenotazione3 = new PrenotazioneAppello();
			prenotazione3.setAppello(appelloLuglio2);
			prenotazione3.setUtente(stefano);
			prenotazione3.setInsegnamento(java);
			prenotazioneAppelloRepository.save(prenotazione3);

		};
	}

	public static void main(String[] args) {
		SpringApplication.run(MyUnivaqApplication.class, args);
	}

}
