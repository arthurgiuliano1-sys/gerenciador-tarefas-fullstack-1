import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { TarefaComponent } from './tarefa/tarefa'; // Mudamos de tarefa.component para apenas tarefa

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tarefas', component: TarefaComponent }
];
