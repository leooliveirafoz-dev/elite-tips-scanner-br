# Elite Tips Scanner BR - Guia de Desenvolvimento

## Setup Inicial

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

pip install -r requirements.txt
cp .env.example .env

# Configure as variáveis de ambiente
# API_FOOTBALL_KEY
# API_SPORTS_ODDS_KEY
# etc.

# Inicie o servidor
uvicorn main:app --reload
```

O backend estará disponível em `http://localhost:8000`

Documentação da API: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local

# Configure o endpoint da API
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Estrutura de Pastas

### Backend

```
backend/
├── app/
│   ├── models/          # Modelos SQLAlchemy
│   ├── schemas/         # Schemas Pydantic
│   ├── api/
│   │   ├── routes/      # Endpoints da API
│   │   └── dependencies.py
│   ├── services/        # Lógica de negócio
│   ├── integrations/    # APIs externas
│   ├── database/        # Configuração do BD
│   └── utils/           # Utilitários
├── main.py              # Ponto de entrada
├── config.py            # Configurações
└── requirements.txt
```

### Frontend

```
frontend/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página inicial
│   ├── dashboard/       # Dashboard
│   ├── signals/         # Sinais
│   ├── bank/            # Gestão de banca
│   ├── rankings/        # Ranking de ligas
│   └── history/         # Histórico
├── components/          # Componentes
├── lib/                 # Utilitários
└── styles/              # Estilos globais
```

## Padrões de Código

### Python
- PEP 8
- Type hints obrigatórios
- Docstrings em português
- Testes com pytest

### TypeScript/React
- ESLint configurado
- Prettier para formatação
- Componentes funcionais
- Custom hooks para lógica compartilhada

## Commits

Usar semantic commit messages:

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
chore: tarefas gerais (dependências, configuração)
refactor: refatora código
test: adiciona testes
```

## Branches

Convenção:
- `main`: Produção
- `develop`: Desenvolvimento
- `feature/xxx`: Novas funcionalidades
- `fix/xxx`: Correções de bugs
- `docs/xxx`: Documentação

## Próximos Passos

1. [ ] Criar modelos de banco de dados
2. [ ] Implementar integração API-Football
3. [ ] Implementar integração API-Sports Odds
4. [ ] Criar endpoints básicos
5. [ ] Criar página inicial do dashboard

Veja `docs/ROADMAP.md` para o plano completo.
