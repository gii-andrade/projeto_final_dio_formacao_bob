"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarDesafio = gerarDesafio;
exports.formatarDesafio = formatarDesafio;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DESAFIOS_POR_TECNOLOGIA = {
    java: {
        titulo: 'Construa uma API REST de Gerenciamento de Tarefas com Java',
        tarefas: [
            'Configurar projeto Spring Boot com Maven',
            'Modelar a entidade Tarefa (id, titulo, descricao, status, dataCriacao)',
            'Implementar repositório JPA (TarefaRepository)',
            'Criar service com regras de negócio (TarefaService)',
            'Expor endpoints REST: GET /tarefas, POST /tarefas, PUT /tarefas/{id}, DELETE /tarefas/{id}',
            'Adicionar validações com Bean Validation (@NotBlank, @NotNull)',
            'Escrever testes unitários com JUnit 5 e Mockito (cobertura mínima 70%)',
            'Documentar a API com Springdoc OpenAPI (Swagger UI)',
        ],
        xp: 3000,
        prazo: 7,
    },
    python: {
        titulo: 'Desenvolva uma API de Blog com Django REST Framework',
        tarefas: [
            'Criar projeto Django e configurar DRF',
            'Modelar entidades Post e Comentario',
            'Implementar serializers e viewsets',
            'Adicionar autenticação JWT com SimpleJWT',
            'Escrever testes com pytest-django',
        ],
        xp: 2500,
        prazo: 7,
    },
    default: {
        titulo: 'Projeto Prático de Desenvolvimento de Software',
        tarefas: [
            'Definir requisitos do projeto',
            'Implementar funcionalidades principais',
            'Escrever testes automatizados',
            'Documentar o código',
        ],
        xp: 2000,
        prazo: 7,
    },
};
function gerarDesafio(aluno, trilha, outputPath) {
    if (!aluno.nome || aluno.nome.trim() === '') {
        throw new Error('Nome do aluno é obrigatório.');
    }
    if (!aluno.email || !aluno.email.includes('@')) {
        throw new Error('E-mail do aluno inválido.');
    }
    const chave = Object.keys(DESAFIOS_POR_TECNOLOGIA).find((k) => trilha.tecnologia.toLowerCase().includes(k)) ?? 'default';
    const template = DESAFIOS_POR_TECNOLOGIA[chave];
    const desafio = {
        id: `desafio-${trilha.id}-${Date.now()}`,
        titulo: template.titulo,
        descricao: `Desafio prático da trilha "${trilha.nome}" para consolidar o aprendizado de ${trilha.tecnologia}.`,
        tecnologia: trilha.tecnologia,
        nivel: trilha.nivel,
        trilha_id: trilha.id,
        trilha_nome: trilha.nome,
        aluno,
        tarefas: template.tarefas,
        xp_disponivel: template.xp,
        prazo_dias: template.prazo,
        gerado_em: new Date().toISOString(),
    };
    if (outputPath) {
        const conteudo = formatarDesafio(desafio);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, conteudo, 'utf-8');
    }
    return desafio;
}
function formatarDesafio(desafio) {
    const linhas = [
        '='.repeat(60),
        `  DESAFIO DIO — ${desafio.tecnologia.toUpperCase()}`,
        '='.repeat(60),
        '',
        `Título   : ${desafio.titulo}`,
        `Nível    : ${desafio.nivel}`,
        `Trilha   : ${desafio.trilha_nome}`,
        `Aluno    : ${desafio.aluno.nome}`,
        `E-mail   : ${desafio.aluno.email}`,
        `XP       : ${desafio.xp_disponivel.toLocaleString('pt-BR')} pontos`,
        `Prazo    : ${desafio.prazo_dias} dias`,
        `Gerado em: ${new Date(desafio.gerado_em).toLocaleString('pt-BR')}`,
        '',
        'TAREFAS:',
        ...desafio.tarefas.map((t, i) => `  ${i + 1}. ${t}`),
        '',
        `Descrição: ${desafio.descricao}`,
        '',
        '='.repeat(60),
        'Boa sorte! Complete o desafio e suba no seu GitHub. 🚀',
        '='.repeat(60),
    ];
    return linhas.join('\n');
}
//# sourceMappingURL=desafio.js.map