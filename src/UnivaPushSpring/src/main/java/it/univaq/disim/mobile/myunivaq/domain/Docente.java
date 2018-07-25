package it.univaq.disim.mobile.myunivaq.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("docente")
public class Docente extends Utente {

}
