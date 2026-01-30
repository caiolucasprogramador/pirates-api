# Pirates API

API REST desenvolvida em **Node.js + Express** para gerenciamento de piratas. Este projeto foi criado com foco em aprendizado prático de backend, organização de código, rotas REST e boas práticas iniciais.

---

## Objetivo do Projeto

Fornecer uma API simples que permita **criar, listar, atualizar e remover piratas**, servindo como backend para o projeto *pirates-frontend*.

Este projeto faz parte de um ciclo de evolução técnica, começando com fundamentos sólidos antes de avançar para camadas mais complexas como autenticação, testes e deploy.

---

## Tecnologias Utilizadas

* Node.js
* Express
* JavaScript
* PostgreSQL
* node-postgres (pg)

---

## Estrutura do Projeto

```
pirates-api/
├── src/
│   ├── routes/        # Definição das rotas da aplicação
│   ├── controllers/   # Lógica de controle das requisições
│   ├── middlewares/   # Middlewares da aplicação
│   ├── app.js         # Configuração principal do Express
│   └── server.js      # Inicialização do servidor
├── package.json
├── database.sql
└── README.md
```

> A separação por camadas facilita manutenção, testes e escalabilidade.

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

* Node.js instalado (versão LTS recomendada)
* npm ou yarn
* PostgreSQL em execução

### Passos

```bash
# Clone o repositório
git clone https://github.com/caiolucasprogramador/pirates-api.git

# Acesse a pasta do projeto
cd pirates-api

# Instale as dependências
npm install
```
### Configuração do ambiente
Crie um banco de dados PostgreSQL e execute o script database.sql

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=pirates
DB_PASSWORD=sua_senha
DB_PORT=5432

# Inicie o servidor em modo desenvolvimento
npm run dev
```

O servidor irá rodar, por padrão, em:

```
http://localhost:3000
```

---

## Endpoints (Exemplo)

> Os endpoints podem variar conforme a implementação atual.

### Listar piratas

```
GET /pirates
```

### Criar um pirata

```
POST /pirates
```

**Body (JSON):**

```json
{
  "name": "Monkey D. Luffy",
  "role": "Capitão",
  "bounty": 3000000000
}
```

### Atualizar um pirata

```
PUT /pirates/:id
```

### Remover um pirata

```
DELETE /pirates/:id
```

---

## Tratamento de Erros

A API utiliza middlewares para capturar erros e retornar respostas padronizadas.

Exemplo de resposta de erro:

```json
{
  "error": "Pirata não encontrado"
}
```

---

### Frontend do Projeto

O frontend que consome esta API está disponível em:

[https://github.com/caiolucasprogramador/pirates-frontend](https://github.com/caiolucasprogramador/pirates-frontend)

---

Este projeto é de uso livre para fins educacionais.
