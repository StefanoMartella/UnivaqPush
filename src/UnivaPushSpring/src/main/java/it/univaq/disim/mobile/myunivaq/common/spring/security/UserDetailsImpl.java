package it.univaq.disim.mobile.myunivaq.common.spring.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.univaq.disim.mobile.myunivaq.domain.Docente;
import it.univaq.disim.mobile.myunivaq.domain.Studente;
import it.univaq.disim.mobile.myunivaq.domain.Utente;

@SuppressWarnings("serial")
public class UserDetailsImpl implements UserDetails {

	private Utente utente;

	public UserDetailsImpl(Utente utente) {
		this.utente = utente;
	}

	@Override
	public String getUsername() {
		return utente.getUsername();
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return utente.getPassword();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> result = new ArrayList<>();

		if (utente instanceof Docente) {
			GrantedAuthorityImpl authorityImpl = new GrantedAuthorityImpl("docente");
			result.add(authorityImpl);
		} else {
			if (utente instanceof Studente) {
				GrantedAuthorityImpl authorityImpl = new GrantedAuthorityImpl("studente");
				result.add(authorityImpl);
			}
		}
		return result;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Utente getUtente() {
		return utente;
	}

}