package com.esig.gerenciador_tarefas.repository;

import com.esig.gerenciador_tarefas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Este método é vital: ele busca o usuário pelo nome na hora do login
    Optional<Usuario> findByLogin(String login);
}
