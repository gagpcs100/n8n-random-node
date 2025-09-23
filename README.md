# n8n Random Node 🎲

Um **nó customizado para o [n8n](https://n8n.io/)** que gera números aleatórios usando a API do [Random.org](https://www.random.org).

Este repositório contém apenas o **pacote do node**.  
Os arquivos de desenvolvimento ficam em `nodes/` e o código usado pelo n8n fica em `dist/`.

---

## ✨ Funcionalidades
- Operação: **True Random Number Generator**
- Parâmetros:
  - `Min` → valor mínimo (inteiro)
  - `Max` → valor máximo (inteiro)
- Saída: número aleatório no intervalo `[Min, Max]`
- Inclui ícone próprio (`random.svg`)

---

## 📦 Requisitos
- Node.js 18+ (recomendado 20 ou 22)
- npm
- (Opcional) Docker + Docker Compose para rodar o n8n

---

## 🚀 Instalação e uso

### 1. Clonar e compilar
```bash
git clone <URL-do-seu-repo>.git random-node
cd random-node
npm install
npm run build
```

👉 Isso gera os arquivos compilados em `dist/`.

### 2. Usar no n8n com Docker Compose
Edite seu `docker-compose.yml` e monte a pasta `dist/` como extensão customizada:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
    volumes:
      - ./n8n-data:/home/node/.n8n
      - ./dist:/home/node/.n8n/custom/random-node
```

Reinicie o n8n e acesse em [http://localhost:5678](http://localhost:5678).

### 3. Usar em instalação local (sem Docker)
Copie a pasta `dist/` para `~/.n8n/custom/random-node/`:

```bash
mkdir -p ~/.n8n/custom/random-node
cp -r dist/* ~/.n8n/custom/random-node/
```

Reinicie o n8n.

---

## 🧪 Como testar
1. Abra o editor do n8n em [http://localhost:5678](http://localhost:5678)  
2. Crie um novo workflow  
3. Adicione o node **True Random Number Generator**  
4. Defina valores para `Min` e `Max`  
5. Execute 🎉  

---

## 🗂️ Estrutura do projeto
```
random-node/
├─ nodes/                # código fonte (TypeScript/JavaScript)
│  └─ random/
│     ├─ Random.node.ts
│     └─ random.svg
├─ dist/                 # código compilado (usado pelo n8n)
│  └─ nodes/
│     └─ random/
│        ├─ Random.node.js
│        ├─ Random.node.d.ts
│        └─ random.svg
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## 🔗 Endpoint utilizado
```
https://www.random.org/integers/?num=1&min=<min>&max=<max>&col=1&base=10&format=plain&rnd=new
```

---

## 🧰 Scripts npm
- `npm run build` → compila o código e copia o `random.svg` para `dist/`

---


