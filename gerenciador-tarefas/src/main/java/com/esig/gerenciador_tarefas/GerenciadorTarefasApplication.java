package com.esig.gerenciador_tarefas;

import com.esig.gerenciador_tarefas.model.Usuario;
import com.esig.gerenciador_tarefas.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class GerenciadorTarefasApplication {

	public static void main(String[] args) {
		SpringApplication.run(GerenciadorTarefasApplication.class, args);
	}

	/*@Bean
	CommandLineRunner init(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
		return args -> {
			repository.findByLogin("arthur").ifPresent(repository::delete);

			Usuario user = new Usuario();
			user.setLogin("arthur");
			// O  Java vai gerar a criptografia agora
			user.setSenha(passwordEncoder.encode("123456"));
			repository.save(user);

			System.out.println("#########################################");
			System.out.println("USUÁRIO ARTHUR CRIADO COM SUCESSO (SENHA: 123456)");
			System.out.println("#########################################");
		}
	   };*/
	}


