package com.esig.gerenciador_tarefas.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String responsavel;
    private String prioridade;
    private LocalDate deadline;
    private String status = "Em andamento";
}