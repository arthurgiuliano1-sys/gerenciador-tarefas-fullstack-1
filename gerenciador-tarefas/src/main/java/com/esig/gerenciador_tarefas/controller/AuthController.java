package com.esig.gerenciador_tarefas.controller;

import com.esig.gerenciador_tarefas.model.Usuario;
import com.esig.gerenciador_tarefas.repository.UsuarioRepository;
import com.esig.gerenciador_tarefas.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        return repository.findByLogin(usuario.getLogin())
                .map(user -> {

                    if (passwordEncoder.matches(usuario.getSenha(), user.getSenha())) {
                    // if (usuario.getSenha().equals(user.getSenha())) {
                        String token = jwtUtil.gerarToken(user.getLogin());
                        return ResponseEntity.ok(Map.of("token", token));
                    }
                    return ResponseEntity.status(401).body(Collections.singletonMap("error", "Senha incorreta"));
                })
                .orElse(ResponseEntity.status(401).body(Collections.singletonMap("error", "Usuário não encontrado")));
    }

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        if (repository.findByLogin(usuario.getLogin()).isPresent()) {
            return ResponseEntity.badRequest().body("Usuário já existe!");
        }
        // Codifica a senha antes de salvar
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return ResponseEntity.ok(repository.save(usuario));
    }
}

