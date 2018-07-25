package it.univaq.disim.mobile.myunivaq.common.spring.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTAuthenticationTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JWTTokenUtil jwtTokenUtil;

	@Value("${jwt.header}")
	private String tokenHeader;

	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		String authToken = request.getHeader(this.tokenHeader);
		UserDetails userDetails = null;

		if (authToken != null) {
			String userName = jwtTokenUtil.getUsernameFromToken(authToken);
			if (userName != null) {
				userDetails = userDetailsService.loadUserByUsername(userName);
			} 

		}

		if (userDetails != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			// Ricostruisco l'userdetails con i dati contenuti nel token
			// controllo integrita' token
			if (jwtTokenUtil.validateToken(authToken, userDetails)) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		chain.doFilter(request, response);
	}
}