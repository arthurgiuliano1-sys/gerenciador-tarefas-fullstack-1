package com.esig.gerenciador_tarefas.controller;

import com.esig.gerenciador_tarefas.model.Tarefa;
import com.esig.gerenciador_tarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin(origins = "*") // Permite que a tela acesse o código
public class TarefaController {

    @Autowired
    private TarefaRepository repository;

    @GetMapping
    public List<Tarefa> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Tarefa salvar(@RequestBody Tarefa tarefa) {
        return repository.save(tarefa);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Tarefa editar(@PathVariable Long id, @RequestBody Tarefa tarefa) {
        tarefa.setId(id);
        return repository.save(tarefa);}
}