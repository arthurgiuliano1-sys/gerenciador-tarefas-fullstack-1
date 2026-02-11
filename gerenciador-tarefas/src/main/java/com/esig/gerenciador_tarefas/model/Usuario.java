package com.esig.gerenciador_tarefas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Se o seu projeto não usa Lombok, você precisará criar os Getters e Setters manualmente
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String login;

    @Column(nullable = false)
    private String senha;
}