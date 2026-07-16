import { StyleSheet } from 'react-native';

// Tipagem dos dados
export type Categoria = 'Todas' | 'Estudo' | 'Trabalho' | 'Pessoal';

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  concluida: boolean;
}

// ... (mantenha as tipagens Tarefa e Categoria lá em cima iguais)

// Estilos Globais atualizados com a Paleta Rosa
export const estilosGlobais = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FDF4F7', // Fundo rosa bem clarinho
    paddingTop: 50, 
  },
  cabecalho: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D81B60', // Rosa forte para o título
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  scrollCategorias: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  btnCategoria: {
    backgroundColor: '#F8D7E3', // Rosa pastel para botões inativos
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, 
  },
  btnCategoriaAtivo: {
    backgroundColor: '#E91E63', // Rosa vibrante para o botão selecionado
  },
  txtCategoria: {
    color: '#882244', // Tom mais escuro para leitura no fundo claro
    fontWeight: '600',
  },
  txtCategoriaAtivo: {
    color: '#FFF', // Texto branco no botão rosa vibrante
  },
  listaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  }
});