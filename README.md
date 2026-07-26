# Geosphere — Backend

API intermediária (proxy) responsável por consumir a [REST Countries API](https://restcountries.com) em nome do frontend do projeto Geosphere.

## Por que esse backend existe

A REST Countries API passou a exigir autenticação via **Bearer Token** para todas as requisições. Como o token é uma credencial sensível, ele não pode ficar exposto no código do frontend — qualquer pessoa poderia visualizá-lo através do DevTools do navegador ou do código-fonte publicado no GitHub.

Para resolver isso, esse backend atua como uma camada intermediária:

```
Frontend  →  Backend (Geosphere API)  →  REST Countries API
```

O frontend nunca tem acesso ao token. Ele apenas consome os endpoints deste backend, que por sua vez adiciona o token nas requisições feitas à REST Countries e devolve os dados já tratados para o frontend.

## Tecnologias

- Node.js
- Express
- TypeScript

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/countries` | Retorna a lista completa de países |
| GET | `/api/countries/:code` | Retorna os dados de um país específico pelo código alfa-2 (ex: `BR`) |

## Como executar

### Pré-requisitos

- Node.js instalado
- Um token de acesso da REST Countries API ([restcountries.com/api-keys](https://restcountries.com/api-keys))

### Passo a passo

Clone o repositório:
```bash
git clone https://github.com/seu-usuario/geosphere-backend.git
cd geosphere-backend
```

Instale as dependências:
```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com o seu token:
```
RESTCOUNTRIES_TOKEN=seu_token_aqui
PORT=3001
```

Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`.

### Build para produção

```bash
npm run build
npm start
```