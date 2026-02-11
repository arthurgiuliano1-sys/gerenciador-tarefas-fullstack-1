# 📝 Gerenciador de Tarefas Full Stack

Atividade de gestão de tarefas desenvolvimento full stack.

## 🚀 Funcionalidades Implementadas

Conforme os requisitos técnicos, o projeto contempla:

* **A) CRUD Completo**: Cadastro, visualização, edição e exclusão de tarefas.
* **B) Segurança**: Autenticação Stateless via JWT e criptografia de senhas.
* **C) Filtros de Busca**: Listagem com filtros por ID, Título/Descrição e Situação.
* **D) Documentação Interativa**: Implementação do Swagger UI para testes da API.
  
## 🛡️ Segurança Implementada

* **Autenticação Stateless**: Uso de **JSON Web Token (JWT)** para controle de sessões.
* **Criptografia de Senhas**: Implementação de **BCrypt** através do `PasswordEncoder` do Spring Security.
* **Proteção de Rotas**: Filtros customizados para garantir que apenas usuários autenticados acessem a API.

## 🛠️ Tecnologias Utilizadas

* **Backend**: Java 21, Spring Boot 3.5.10, Spring Security, JPA/Hibernate.
* **Frontend**: Angular.
* **Banco de Dados**: PostgreSQL.

## ⚙️ Como Executar o Projeto Localmente

### Passo 1: Backend
1. Certifique-se de ter o **Java 21** instalado.
2. Navegue até a pasta do backend no terminal.
3. Execute o comando: `./mvnw spring-boot:run`
4. Acesse o Swagger em: `http://localhost:8080/swagger-ui/index.html` para validar os endpoints.

### Passo 2: Frontend
1. Certifique-se de ter o **Node.js** e o **Angular CLI** instalados.
2. Navegue até a pasta `frontend`.
3. Instale as dependências com: `npm install`
4. Inicie a aplicação com: `ng serve`
5. Acesse em seu navegador: `http://localhost:4200`
