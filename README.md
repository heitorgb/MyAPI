# 📦 Estrutura do Banco de Dados

Este repositório contém a definição de um banco de dados PostgreSQL com três tabelas principais: `usu`, `tc` e `doc`, além de uma `SEQUENCE` utilizada para geração automática de IDs na tabela `doc`.

---

## 🔐 Tabela `usu` (Usuários)

Armazena os dados de login dos usuários do sistema.

```sql
CREATE TABLE public.usu (
  usuemail varchar(120) NULL,
  ususenha varchar(32) NULL,
  CONSTRAINT pk_usu PRIMARY KEY (usuemail)
);
```

- **usuemail**: E-mail do usuário (chave primária).
- **ususenha**: Senha do usuário (armazenada como hash MD5, por exemplo).

### 👤 Inserção de exemplo:
```sql
INSERT INTO usu VALUES ('caiorodrigocev@gmail.com', md5('123'));
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
  tccod int4 NOT NULL,
  tcdes varchar(40) NOT NULL,
  tctipo varchar(40) NULL,
  CONSTRAINT tc_pkey PRIMARY KEY (tccod)
);
```

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

## 📄 Tabela `doc` (Documentos)

Registra documentos de cobrança, com associação ao tipo de cobrança.

```sql
CREATE TABLE public.doc (
  docempparcod int4 NOT NULL,
  doccod serial NOT NULL,
  doctipo bpchar(3) NULL,
  docsta bpchar(2) NULL,
  docdsta timestamp NULL,
  docv numeric(14, 4) DEFAULT 0 NOT NULL,
  doctccod int4 NULL,
  docnum varchar(18) NULL,
  docobs bpchar(254) NULL,
  CONSTRAINT pk_doc PRIMARY KEY (docempparcod, doccod),
  CONSTRAINT fk_doc_tc FOREIGN KEY (doctccod) REFERENCES public.tc(tccod)
);
```

- **docempparcod**: Código da empresa ou parceiro.
- **doccod**: Código do documento (gerado automaticamente pela sequence).
- **doctipo**: Tipo do documento.
- **docsta**: Status.
- **docdsta**: Data de status.
- **docv**: Valor do documento.
- **doctccod**: Código do tipo de cobrança (chave estrangeira para `tc`).
- **docnum**: Número do documento.
- **docobs**: Observações.

### ➕ Inserção de exemplo:
```sql
INSERT INTO doc (docempparcod, docv, doctccod) VALUES (1, 100.00, 1);
```

### 🔐 Permissões:
- Dono: `postgres`
- Permissões completas: `postgres`
- Permissão de leitura: `consulta`

---

## 🔁 Sequence `seq_doc`

Responsável por gerar automaticamente o código (`doccod`) para os documentos na tabela `doc`.

```sql
CREATE SEQUENCE public.seq_doc
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1
  NO CYCLE;
```

- Associada ao campo `doccod` da tabela `doc`.

```sql
ALTER TABLE public.doc ADD doccod int4 DEFAULT nextval('seq_doc'::regclass) NOT NULL;
```

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
