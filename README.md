# 💰 Portal de Controle Financeiro Pessoal

Sistema web para controle financeiro pessoal com login e senha, onde o usuário pode registrar receitas, despesas e visualizar o total líquido.

---
## 🛠️ Tecnologias Utilizadas

| 🖥️ Frontend  | ⚙️ Backend     | 📦 Pacotes Node.js                        |
|--------------|----------------|-------------------------------------------|
| HTML5        | Node.js        | **Servidor & Roteamento:**               |
| CSS3         | Express        | • express                                 |
| JavaScript   | PostgreSQL     |                                           |
|              |                | **Banco de Dados:**                      |
|              |                | • pg                                      |
|              |                |                                           |
|              |                | **Autenticação & Sessões:**             |
|              |                | • bcryptjs                                |
|              |                | • jsonwebtoken                            |
|              |                | • passport                                |
|              |                | • passport-google-oauth20                |
|              |                | • express-session                         |
|              |                |                                           |
|              |                | **Middlewares & Utilitários:**          |
|              |                | • body-parser                             |
|              |                | • cookie-parser                           |
|              |                | • cors *(opcional)*                       |
|              |                | • dotenv                                  |
|              |                | • morgan *(logger)*                       |
|              |                |                                           |
|              |                | **Template Engine:**                    |
|              |                | • pug                                     |

---

## 📚 Legenda dos Pacotes Node.js

### 🔧 Servidor & Roteamento
- **express**: Framework para rotas e servidor web.

### 🗃️ Banco de Dados
- **pg**: Cliente PostgreSQL para Node.js.

### 🔐 Autenticação & Sessões
- **bcryptjs**: Criptografia de senhas.
- **jsonwebtoken**: Geração/validação de tokens JWT.
- **passport**: Middleware de autenticação.
- **passport-google-oauth20**: Login com conta Google.
- **express-session**: Gerenciamento de sessões com cookies.

### ⚙️ Middlewares & Utilitários
- **body-parser**: Parser de JSON e formulários.
- **cookie-parser**: Leitura de cookies.
- **cors**: Habilita CORS.
- **dotenv**: Gerencia variáveis de ambiente.
- **morgan**: Log das requisições.

### 🎨 Template Engine
- **pug**: Motor de template para renderizar HTML dinâmico.

---


# 📥 Instalação:

### 1. Clone o repositório:
```bash
git clone https://github.com/CaioRodrigoCEVDEV/MyAPI.git
```
### 2. Instalação dos pacotes Node.js

```bash
npm init -y
npm install express pg bcryptjs jsonwebtoken body-parser dotenv cors cookie-parser pug morgan passport passport-google-oauth20 express-session
```
### 3. Crie um arquivo .env na raiz com o seguinte conteúdo:

```bash
DB_HOST=SEU_IP
DB_PORT=PORTA
DB_USER=USUARIO
DB_PASSWORD=SENHA
DB_NAME=BASE_DADOS
BASE_URL=http://localhost:3000
GOOGLE_CLIENT_ID=API_key
GOOGLE_CLIENT_SECRET=API_key
HTTPS=false

```
---
# 📦 Estrutura do Banco de Dados

Este repositório contém a definição de um banco de dados PostgreSQL com três tabelas principais: `usu`, `tc` e `doc`, além de uma `SEQUENCE` utilizada para geração automática de IDs na tabela `doc`.

---

## 🔐 Tabela `usu` (Usuários)

Armazena os dados de login dos usuários do sistema.

```sql
CREATE TABLE public.usu (
	usucod serial4 NOT NULL,
  usunome varchar NULL,
	usuemail varchar(120) NOT NULL,
	ususenha varchar(32) NULL,
	CONSTRAINT pk_usu PRIMARY KEY (usucod, usuemail)
);

-- Permissions

ALTER TABLE public.usu OWNER TO postgres;
GRANT ALL ON TABLE public.usu TO postgres;
```
- **usucod**  : Código do usuario.
- **usunome**  : Nome do usuario.
- **usuemail**: E-mail do usuário (chave primária).
- **ususenha**: Senha do usuário (armazenada como hash MD5, por exemplo).

### 👤 Inserção de exemplo:
```sql
INSERT INTO usu (usunome,usuemail,ususenha)VALUES ('usuario','email@email.com', md5('123'));
```

### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## 💳 Tabela `tc` (Tipos de Cobrança)

Tabela com os tipos de cobrança disponíveis no sistema.

```sql
CREATE TABLE public.tc (
	tcusucod int4 NULL,
	tccod serial4 NOT NULL,
	tcdes varchar(40) NOT NULL,
	tctipo varchar(40) NULL,
	CONSTRAINT tc_pkey PRIMARY KEY (tccod)
);

-- Permissions

ALTER TABLE public.tc OWNER TO postgres;
GRANT ALL ON TABLE public.tc TO postgres;
```

- **tcusucod**: Código do usuário.
- **tccod**: Código do tipo de cobrança (chave primária).
- **tcdes**: Descrição (ex: "DINHEIRO").
- **tctipo**: Tipo da cobrança (ex: "DH").

### ➕ Inserção de exemplo:
```sql
INSERT INTO tc(tccod, tcdes, tctipo) VALUES (1, 'DINHEIRO', 'DH');
```

### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---


## 💳 Tabela `contatipo` (Tipos da conta)

Tabela com os tipos da conta disponíveis no sistema.

```sql
create table public.contatipo (
	contatipocod serial,
	contatipodes varchar,
	CONSTRAINT pk_contatipo PRIMARY KEY (contatipocod)
);

```

- **contatipocod**: Código do tipo da conta (chave primária).
- **contatipodes**: Descrição (ex: "DINHEIRO","CONTA CORRENTE","INVESTIMENTOS").



### ➕ Inserção OBRIGATÓRIA:
```sql
insert into contatipo (contatipodes) values ('Dinheiro');
insert into contatipo (contatipodes) values ('Conta Corrente');
insert into contatipo (contatipodes) values ('Conta Poupança');
insert into contatipo (contatipodes) values ('Investimento');
insert into contatipo (contatipodes) values ('Outro');
```

### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## 💳 Tabela `conta` (Contas)

Tabela com as contas disponíveis no sistema.

```sql
create table public.conta (
  contausucod int NOT NULL,
	contacod serial,
	contades varchar,
	contatipo int,
	contavltotal numeric(14, 2),
	CONSTRAINT pk_conta PRIMARY KEY (contacod),
	CONSTRAINT fk_contatipo FOREIGN KEY (contatipo) REFERENCES public.contatipo(contatipocod)
);
```
- **contausucod**: Código do usuário.
- **contacod**: Código da conta (chave primária).
- **contades**: Descrição (ex: "CAIXA","CARTEIRA","BANCO INTER").
- **contatipo**: Tipo da conta (ex: "1","2","3","4" ou "5").
- **contavltotal**: Saldo total da conta (ex: "36000.00").


### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## 📄 Tabela `doc` (Documentos)

Registra documentos de cobrança, com associação ao tipo de cobrança.

```sql
CREATE TABLE public.doc (
  docusucod int4 NOT NULL,
  doccod serial NOT NULL,
  docnatcod int NULL,
  docsta bpchar(2) NULL,
  docdtlan timestamp NULL,
  docdtpag date,
  docv numeric(14, 2) DEFAULT 0 NOT NULL,
  doctccod int4 NULL,
  docnum varchar(18) NULL,
  docobs bpchar(254) NULL,
  doccontacod int,
  doccatcod int,
  CONSTRAINT pk_doc PRIMARY KEY (doccod,docusucod),
  CONSTRAINT fk_doc_tc FOREIGN KEY (doctccod) REFERENCES public.tc(tccod),
  CONSTRAINT fk_doc FOREIGN KEY (doccontacod) REFERENCES conta(contacod)
);
```

- **docusucod**: Código da usuário.
- **doccod**: Código do documento (gerado automaticamente pela sequence).
- **doctipo**: Tipo do documento.
- **docsta**: Status.
- **docdtlan**: Data de lançamento.
- **docdtpag**: Data de pagamento.
- **docv**: Valor do documento.
- **doctccod**: Código do tipo de cobrança (chave estrangeira para `tc`).
- **docnum**: Número do documento.
- **docobs**: Observações.
- **doccontacod**: Código da conta.
- **doccatcod**: Código da categoria.

### ➕ Inserção de exemplo:
```sql
INSERT INTO doc (docempparcod, docv, doctccod) VALUES (1, 100.00, 1);
```

### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## 💳 Tabela `categoria` (Categorias)

Tabela com as Categorias disponíveis no sistema.

```sql
create table public.categoria (
  catusucod int,
	catcod serial,
	catdes varchar,
	cattipo character,
  catnatcod int,
	CONSTRAINT pk_cat PRIMARY KEY (catcod,cattipo)
);
```

- **catusucod**: Código do usuário.
- **catcod**: Código da categoria (chave primária).
- **catdes**: Descrição (ex: "Transporte","Salario","Mercado").
- **cattipo**: Status da categoria R ou D (ex: "Receita" ou "Despesa").

### ➕ Inserção de exemplo:
```sql
insert into categoria (catusucod,catdes,cattipo) values (1,'Salário','R');
insert into categoria (catusucod,catdes,cattipo) values (1,'Transporte','D');
insert into categoria (catusucod, catdes,cattipo) values (1,'Mercado','D');
insert into categoria (catusucod,catdes,cattipo) values (1,'Frelancer','R');
```


### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## 💳 Tabela `natureza` (Natureza)

Tabela com as Naturezas disponíveis no sistema.

```sql
create table public.natureza (
	natcod serial,
	natdes varchar,
	CONSTRAINT pk_nat PRIMARY KEY (natcod,natdes)
);
```

- **natcod**: Código da natureza (chave primária).
- **natdes**: Descrição (ex: "Receita","Despesa").

### ➕ Inserção OBRIGATÓRIA:
```sql
insert into natureza (natdes) values('Despesa');
insert into natureza (natdes) values('Receita');

```


### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## ✅ Consultas e Testes

### Ver todos os usuários:
```sql
SELECT * FROM usu;
```

### Ver tipos de cobrança:
```sql
SELECT * FROM tc;
```

### Ver documentos:
```sql
SELECT * FROM doc;
```

---

## 🔒 Segurança

As permissões foram definidas para garantir o controle de acesso:

- O usuário `postgres` possui controle total.
- O papel `consulta` possui acesso apenas de leitura.

---
# 💰 View Saldo

```sql
CREATE OR REPLACE VIEW public.vw_saldo
AS SELECT usu,
    conta_saldo + credito - debito AS saldo_final
   FROM ( SELECT c.contausucod AS usu,
            COALESCE(sum(c.contavltotal), 0::numeric) AS conta_saldo,
            ( SELECT COALESCE(sum(d.docv), 0::numeric) AS "coalesce"
                   FROM doc d
                     JOIN conta c2 ON d.doccontacod = c2.contacod
                  WHERE d.docusucod = c.contausucod AND COALESCE(d.docnatcod, 0) = 2  AND d.docsta = 'BA') AS credito,
            ( SELECT COALESCE(sum(d.docv), 0::numeric) AS "coalesce"
                   FROM doc d
                     JOIN conta c2 ON d.doccontacod = c2.contacod
                  WHERE d.docusucod = c.contausucod AND COALESCE(d.docnatcod, 0) = 1  AND d.docsta = 'BA') AS debito
           FROM conta c
          GROUP BY c.contausucod) saldo_geral;

-- Permissions

ALTER TABLE public.vw_saldo OWNER TO postgres;
GRANT ALL ON TABLE public.vw_saldo TO postgres;
```

---

## 🔐 Variáveis de Ambiente

Exemplo `.env`:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
BASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
HTTPS=false

```

---

## 📚 Endpoints

### 🔑 Login

**POST** `/api/login`

**Body:**
```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "token": "jwt_token"
}
```

---

### 👤 Criar Usuário

**POST** `/api/users`

**Body:**
```json
{
  "name": "Nome Teste",
  "email": "email@email.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "name": "Nome Teste",
    "email": "email@email.com"
  }
}
```

---

### 🔒 Perfil do Usuário

**GET** `/api/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "id": 1,
  "name": "Nome Teste",
  "email": "enail@email.com"
}
```

---
