package com.esig.gerenciador_tarefas.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    // Chave de assinatura para o Token
    private final SecretKey CHAVE = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final int EXPIRACAO = 3600000; // 1 hora

    public String gerarToken(String login) {
        return Jwts.builder()
                .setSubject(login)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRACAO))
                .signWith(CHAVE)
                .compact();
    }

    public String extrairLogin(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(CHAVE)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}