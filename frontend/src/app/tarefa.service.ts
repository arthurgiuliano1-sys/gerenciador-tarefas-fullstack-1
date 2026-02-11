import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  responsavel: string;
  prioridade: string;
  deadline: string;
}

@Injectable({
  providedIn: 'root'
})

export class TarefaService {

  // A URL que aponta para o seu projeto Spring Boot (Porta 8080)
  private API = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) {
  }

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.API);
  }

  salvar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.API, tarefa);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


  editar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.API}/${tarefa.id}`, tarefa);
  }

}

