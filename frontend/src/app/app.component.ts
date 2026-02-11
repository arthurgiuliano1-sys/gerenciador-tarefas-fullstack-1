import { Component, OnInit } from '@angular/core';
import { TarefaService } from './tarefa.service';
import { CommonModule } from '@angular/common'; // Resolve o erro ngClass
import { FormsModule } from '@angular/forms';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tarefas: any[] = [];
  tarefasFiltradas: any[] = [];
  tarefa: any = {};
  filtro: string = '';
  statusFiltro: string = '';

  constructor(private service: TarefaService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(dados => {
      this.tarefas = dados;
      this.buscar(); // Garante que a lista filtrada seja atualizada
    });
  }

  buscar() {
    this.tarefasFiltradas = this.tarefas.filter(t => {
      // Filtra por texto (Título ou Responsável)
      const bateTexto = t.titulo.toLowerCase().includes(this.filtro.toLowerCase()) ||
        t.responsavel.toLowerCase().includes(this.filtro.toLowerCase());

      // Filtra por status (Se vazio, mostra todos)
      const bateStatus = this.statusFiltro === '' || t.status === this.statusFiltro;

      return bateTexto && bateStatus;
    });
  }

  salvar() {
    if (this.tarefa.id) {
      this.service.editar(this.tarefa).subscribe(() => {
        this.listar();
        this.tarefa = {};
      });
    } else {
      this.service.salvar(this.tarefa).subscribe(() => {
        this.listar();
        this.tarefa = {};
      });
    }
  }

  preencherCampos(t: any) {
    this.tarefa = { ...t };
  }

  concluir(t: any) {
    t.status = "Concluída";
    this.service.editar(t).subscribe(() => {
      this.listar();
    });
  }

  excluir(id: number) {
    if (confirm('Deseja excluir esta tarefa?')) {
      this.service.excluir(id).subscribe(() => {
        this.listar();
      });
    }
  }
}
