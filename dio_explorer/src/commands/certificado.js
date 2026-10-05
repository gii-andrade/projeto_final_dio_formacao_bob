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
exports.gerarCodigoVerificacao = gerarCodigoVerificacao;
exports.emitirCertificado = emitirCertificado;
exports.formatarCertificado = formatarCertificado;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function gerarCodigoVerificacao(alunoEmail, trilhaId, dataConclusao) {
    const base = `${alunoEmail}|${trilhaId}|${dataConclusao}`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
        const char = base.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    return `DIO-${trilhaId.toUpperCase()}-${hex}`;
}
function emitirCertificado(aluno, trilha, outputPath) {
    if (!aluno.nome || aluno.nome.trim() === '') {
        throw new Error('Nome do aluno é obrigatório para emitir o certificado.');
    }
    if (!aluno.email || !aluno.email.includes('@')) {
        throw new Error('E-mail do aluno inválido para emitir o certificado.');
    }
    if (!trilha.certificado) {
        throw new Error(`A trilha "${trilha.nome}" não oferece certificado.`);
    }
    const dataConclusao = new Date().toISOString();
    const codigoVerificacao = gerarCodigoVerificacao(aluno.email, trilha.id, dataConclusao);
    const badgesConquistados = trilha.badges
        ? trilha.badges.map((b) => `${b.icone} ${b.nome}`)
        : [];
    const certificado = {
        id: `cert-${trilha.id}-${Date.now()}`,
        aluno,
        trilha_id: trilha.id,
        trilha_nome: trilha.nome,
        tecnologia: trilha.tecnologia,
        nivel: trilha.nivel,
        modulos_concluidos: trilha.numero_de_modulos,
        xp_conquistado: trilha.xp_total,
        badges_conquistados: badgesConquistados,
        data_conclusao: dataConclusao,
        codigo_verificacao: codigoVerificacao,
        valido: true,
    };
    if (outputPath) {
        const conteudo = formatarCertificado(certificado);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, conteudo, 'utf-8');
    }
    return certificado;
}
function formatarCertificado(cert) {
    const linhas = [
        '*'.repeat(60),
        '*' + ' '.repeat(58) + '*',
        `*${'CERTIFICADO DE CONCLUSÃO'.padStart(41).padEnd(58)}*`,
        `*${'Digital Innovation One'.padStart(40).padEnd(58)}*`,
        '*' + ' '.repeat(58) + '*',
        '*'.repeat(60),
        '',
        `Certificamos que`,
        '',
        `  👤 ${cert.aluno.nome.toUpperCase()}`,
        `  📧 ${cert.aluno.email}`,
        '',
        `concluiu com êxito a trilha:`,
        '',
        `  📚 ${cert.trilha_nome}`,
        `     Tecnologia : ${cert.tecnologia}`,
        `     Nível      : ${cert.nivel}`,
        `     Módulos    : ${cert.modulos_concluidos}`,
        `     XP Total   : ${cert.xp_conquistado.toLocaleString('pt-BR')} pontos`,
        '',
        `Badges conquistados:`,
        ...cert.badges_conquistados.map((b) => `  • ${b}`),
        '',
        `Data de conclusão : ${new Date(cert.data_conclusao).toLocaleDateString('pt-BR')}`,
        `Código de verificação: ${cert.codigo_verificacao}`,
        '',
        '*'.repeat(60),
        '*' + ' '.repeat(58) + '*',
        `*${'Parabéns! Continue evoluindo na DIO. 🚀'.padStart(49).padEnd(58)}*`,
        '*' + ' '.repeat(58) + '*',
        '*'.repeat(60),
    ];
    return linhas.join('\n');
}
//# sourceMappingURL=certificado.js.map