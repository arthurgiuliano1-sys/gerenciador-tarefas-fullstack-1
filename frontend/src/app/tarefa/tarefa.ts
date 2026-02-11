import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TarefaService } from '../tarefa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefa.html',
  styleUrls: ['./tarefa.css']
})
export class TarefaComponent implements OnInit {

  tarefas: any[] = [];
  tarefasFiltradas: any[] = [];
  tarefa: any = {};


  filtro: string = '';       // Para Título ou Descrição
  filtroId: any = '';
  statusFiltro: string = '';

  constructor(private service: TarefaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(dados => {
      this.tarefas = dados;
      this.buscar();
      this.cdr.detectChanges();
    });
  }

  buscar() {
    this.tarefasFiltradas = [...this.tarefas].filter(t => {
      // 1. Filtra por Título ou Descrição (Exigência do PDF)
      const termo = this.filtro.toLowerCase();
      const bateTexto = (t.titulo?.toLowerCase() || '').includes(termo) ||
        (t.descricao?.toLowerCase() || '').includes(termo);

      // 2. Filtra por Status (Situação)
      const bateStatus = this.statusFiltro === '' || t.status === this.statusFiltro;

      // 3. Filtra por Número/ID (Exigência do PDF)
      const bateId = this.filtroId === '' || this.filtroId === null || t.id == this.filtroId;

      return bateTexto && bateStatus && bateId;
    });
    this.cdr.detectChanges();
  }

  salvar() {
    // Validação completa conforme os campos obrigatórios
    if (!this.tarefa.titulo || !this.tarefa.responsavel || !this.tarefa.prioridade || !this.tarefa.deadline) {
      alert('Erro: Preencha Título, Responsável, Prioridade e Data Limite!');
      return;
    }

    const operacao = this.tarefa.id ?
      this.service.editar(this.tarefa) :
      this.service.salvar(this.tarefa);

    operacao.subscribe({
      next: () => {
        this.tarefa = {};
        this.listar();
        alert('Tarefa salva com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao salvar tarefa:', err);
        alert('Erro no servidor ao tentar salvar.');
      }
    });
  }

  concluir(t: any) {
    const tarefaConcluida = { ...t, status: "Concluída" };
    this.service.editar(tarefaConcluida).subscribe(() => this.listar());
  }

  excluir(id: number) {
    if (confirm('Deseja excluir esta tarefa?')) {
      this.service.excluir(id).subscribe(() => this.listar());
    }
  }

  preencherCampos(t: any) {
    // Ao editar, garantimos que o objeto tarefa receba todos os campos
    this.tarefa = { ...t };
  }
}
