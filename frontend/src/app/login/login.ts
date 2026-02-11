import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';

  // O CONSTRUTOR é o que faltava para tirar o erro dos imports
  constructor(private authService: AuthService, private router: Router) {}

  fazerLogin() {
    // Chamando o serviço que criamos no arquivo auth.ts
    this.authService.login({ login: this.username, senha: this.password }).subscribe({
    //this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login realizado com sucesso!');
        this.router.navigate(['/tarefas']); // Te leva para as tarefas
      },
      error: (err) => {
        console.error('Erro no login', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}
