import { Trilha } from '../../src/commands/trilha';

export const trilhaJavaMock: Trilha = {
  id: 'trilha-004',
  nome: 'Formação Java Developer',
  descricao: 'Domine a linguagem Java do zero ao avançado, construindo APIs REST com Spring Boot.',
  tecnologia: 'Java / Spring Boot / JPA / Hibernate / Maven',
  nivel: 'Intermediário',
  numero_de_modulos: 12,
  xp_total: 16000,
  duracao_estimada_horas: 110,
  certificado: true,
  vitalicio: true,
  modulos: [
    'Fundamentos de Java e Ambiente de Desenvolvimento',
    'Orientação a Objetos em Java',
    'Coleções, Generics e Streams',
    'Tratamento de Exceções e Boas Práticas',
    'Banco de Dados com JDBC',
    'JPA e Hibernate — Mapeamento OR',
    'Spring Boot — Fundamentos',
    'Criando APIs REST com Spring Boot',
    'Segurança com Spring Security e JWT',
    'Testes Automatizados com JUnit 5 e Mockito',
    'Docker para Aplicações Java',
    'Deploy na Nuvem com Railway e Render',
  ],
  badges: [
    { id: 'badge-java-01', nome: 'Java Rookie', descricao: 'Módulo 1', xp_requerido: 2000, icone: '☕' },
    { id: 'badge-java-02', nome: 'Spring Boot Developer', descricao: 'Módulo 2', xp_requerido: 7000, icone: '🍃' },
    { id: 'badge-java-03', nome: 'Java Master', descricao: 'Módulo 3', xp_requerido: 16000, icone: '🏆' },
  ],
  promocoes: [
    {
      id: 'promo-java-01',
      descricao: 'Java Week DIO — 50% off',
      desconto_percentual: 50,
      validade: '2024-10-15',
      codigo_cupom: 'JAVAWEEK50',
    },
  ],
};

export const trilhaSemCertMock: Trilha = {
  id: 'trilha-sem-cert',
  nome: 'Trilha Sem Certificado',
  descricao: 'Trilha teste sem certificado.',
  tecnologia: 'Assembly',
  nivel: 'Avançado',
  numero_de_modulos: 3,
  xp_total: 500,
  duracao_estimada_horas: 10,
  certificado: false,
  vitalicio: false,
  modulos: ['Módulo 1', 'Módulo 2', 'Módulo 3'],
  badges: [],
  promocoes: [],
};

export const alunoMock = {
  nome: 'João da Silva',
  email: 'joao.silva@dio.me',
};
