import { z } from 'zod';
export function registerPrompts(server) {
    /**
     * Prompt: explorar_trilha
     * Gera um prompt rico para o modelo apresentar uma trilha ao aluno.
     */
    server.registerPrompt('explorar_trilha', {
        description: 'Gera um prompt para apresentar uma trilha DIO de forma didática e motivadora.',
        argsSchema: {
            tecnologia: z.string().describe('Tecnologia da trilha (ex: Java, Python)'),
            nivel_aluno: z
                .enum(['iniciante', 'intermediário', 'avançado'])
                .default('iniciante')
                .describe('Nível atual do aluno'),
        },
    }, async ({ tecnologia, nivel_aluno }) => ({
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: `Você é um mentor da DIO (Digital Innovation One). ` +
                        `Um aluno de nível ${nivel_aluno} quer aprender ${tecnologia}. ` +
                        `Use a tool "buscar_trilha" para encontrar a trilha mais adequada e apresente-a de forma ` +
                        `clara e motivadora, destacando: o que ele vai aprender, quanto tempo leva, quantos módulos tem ` +
                        `e quais badges pode conquistar. Termine com uma mensagem de encorajamento.`,
                },
            },
        ],
    }));
    /**
     * Prompt: onboarding_aluno
     * Guia completo de onboarding: busca trilha, gera desafio e emite certificado.
     */
    server.registerPrompt('onboarding_aluno', {
        description: 'Fluxo completo de onboarding: apresenta trilha, gera desafio e emite certificado para o aluno.',
        argsSchema: {
            nome: z.string().describe('Nome do aluno'),
            email: z.string().describe('E-mail do aluno'),
            tecnologia: z.string().describe('Tecnologia de interesse'),
        },
    }, async ({ nome, email, tecnologia }) => ({
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: `Você é um assistente da DIO. Faça o onboarding completo do aluno ${nome} (${email}) ` +
                        `que quer aprender ${tecnologia}. Siga estes passos em ordem:\n` +
                        `1. Use "buscar_trilha" para encontrar a trilha de ${tecnologia}\n` +
                        `2. Use "gerar_desafio" para criar um desafio prático (salvar_arquivo: true)\n` +
                        `3. Use "emitir_certificado" para emitir o certificado de conclusão (salvar_arquivo: true)\n` +
                        `4. Apresente um resumo com todas as informações geradas de forma organizada.`,
                },
            },
        ],
    }));
}
//# sourceMappingURL=index.js.map