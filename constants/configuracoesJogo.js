export const DIFICULDADES = {
  facil: {
    chave: 'facil',
    nome: 'Fácil',
    minimo: 1,
    maximo: 50,
    descricao: 'Código de 1 a 50',
    tentativasIdeais: 6,
  },
  dificil: {
    chave: 'dificil',
    nome: 'Difícil',
    minimo: 1,
    maximo: 99,
    descricao: 'Código de 1 a 99',
    tentativasIdeais: 7,
  },
  insano: {
    chave: 'insano',
    nome: 'Insano',
    minimo: 1,
    maximo: 200,
    descricao: 'Código de 1 a 200',
    tentativasIdeais: 8,
  },
};

export const DIFICULDADE_PADRAO = 'dificil';

export function obterEstrelas(tentativas, chaveDificuldade) {
  const dificuldade = DIFICULDADES[chaveDificuldade];

  if (tentativas <= dificuldade.tentativasIdeais) {
    return 3;
  }

  if (tentativas <= dificuldade.tentativasIdeais + 2) {
    return 2;
  }

  return 1;
}
