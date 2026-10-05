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
exports.carregarTrilhas = carregarTrilhas;
exports.buscarTrilha = buscarTrilha;
exports.formatarTrilha = formatarTrilha;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function carregarTrilhas(dataPath) {
    const filePath = dataPath ?? path.resolve(__dirname, '../../data/trilhas_dio.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed.trilhas;
}
function buscarTrilha(termo, dataPath) {
    if (!termo || termo.trim() === '') {
        throw new Error('Termo de busca não pode ser vazio.');
    }
    const trilhas = carregarTrilhas(dataPath);
    const termoNorm = termo.toLowerCase().trim();
    const encontradas = trilhas.filter((t) => t.nome.toLowerCase().includes(termoNorm) ||
        t.tecnologia.toLowerCase().includes(termoNorm) ||
        t.descricao.toLowerCase().includes(termoNorm));
    return {
        encontradas,
        termo,
        total: encontradas.length,
    };
}
function formatarTrilha(trilha) {
    const linhas = [
        `📚 ${trilha.nome}`,
        `   ID       : ${trilha.id}`,
        `   Tecnologia: ${trilha.tecnologia}`,
        `   Nível    : ${trilha.nivel}`,
        `   Módulos  : ${trilha.numero_de_modulos}`,
        `   XP Total : ${trilha.xp_total.toLocaleString('pt-BR')}`,
        `   Duração  : ${trilha.duracao_estimada_horas}h`,
        `   Certificado: ${trilha.certificado ? 'Sim ✅' : 'Não'}`,
        `   Módulos na trilha:`,
        ...trilha.modulos.map((m, i) => `     ${i + 1}. ${m}`),
    ];
    return linhas.join('\n');
}
//# sourceMappingURL=trilha.js.map