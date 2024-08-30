package com.movie.movie.auth;

import com.movie.movie.exception.AuthorizationException;
import com.movie.movie.exception.SkipFilterException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * JwtAuthenticationFilter akan mendapatkan token jwt dari header dan memvalidasinya,
 * lalu mengatur informasi autentikasi
 * pada SecurityContextHolder.
 * Jika token telah kadaluarsa atau tidak valid, status respon akan diatur ke
 * HttpStatus.UNAUTHORIZED dan pesan
 * akan ditulis ke badan respon.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    JwtConfig jwtConfig;

    /**
     * Konstruktor untuk menginisialisasi jwtConfig
     */
    JwtAuthenticationFilter(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    /**
     * Metode ini akan dipanggil sekali per request.
     * Ia akan mendapatkan token jwt dari header, memvalidasinya, dan mengatur
     * informasi autentikasi
     * pada SecurityContextHolder.
     * Jika token telah kadaluarsa atau tidak valid, status respon akan diatur ke
     * HttpStatus.UNAUTHORIZED dan pesan
     * akan ditulis ke badan respon.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            Claims claims = getClaims(request, response);
            if (claims.getExpiration().before(new Date())) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Token telah kadaluarsa");
                return;
            }
            String userName = getUsername(claims);
            List<String> authorities = getAuthorities(claims);
            setAuth(userName, authorities);

        } catch (SkipFilterException e) {

        } catch (AuthorizationException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("User tidak memiliki akses");
            return;
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Metode ini akan mendapatkan daftar otoritas dari klaim token jwt.
     */
    private List<String> getAuthorities(Claims claims) {
        @SuppressWarnings("unchecked")
        List<String> authorities = (List<String>) claims.get("authorities");
        return authorities;
    }

    /**
     * Metode ini akan mengatur informasi autentikasi pada SecurityContextHolder.
     */
    private void setAuth(String username, List<String> authorities) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                username,
                null,
                authorities.stream().map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList()));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    /**
     * Metode ini akan mendapatkan nama pengguna dari klaim token jwt.
     * Jika nama pengguna adalah null, maka AuthorizationException akan dilemparkan.
     */
    private String getUsername(Claims claims) throws AuthorizationException {
        String userName = claims.getSubject();
        if (userName == null) {
            throw new AuthorizationException();
        }
        return userName;
    }

    /**
     * Metode ini akan mendapatkan token jwt dari header dan memvalidasinya.
     * Jika token tidak valid, maka SkipFilterException akan dilemparkan.
     * Token akan ditambahkan ke header respon.
     */
    private Claims getClaims(HttpServletRequest request, HttpServletResponse response) throws SkipFilterException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader == null || !authorizationHeader.startsWith(jwtConfig.getPrefix())) {
            throw new SkipFilterException();
        }

        String token = authorizationHeader.replace(jwtConfig.getPrefix(), "");

        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getSecret().getBytes())
                .parseClaimsJws(token)
                .getBody();

        response.addHeader(HttpHeaders.AUTHORIZATION, jwtConfig.getPrefix() + token);

        return claims;
    }
}


