// src/types/registro.ts

export type Situacao = 'Aprovado' | 'Recuperação' | 'Reprovado';

export interface RegistroCalculo {
  id: string;
  notas: [number, number, number];
  media: number;
  situacao: Situacao;
}