import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Tarefa } from '../../styles/globais';

// Definição das Props
interface ItemTarefaProps {
  tarefa: Tarefa;
  aoPressionar: () => void;
}

export function ItemTarefa({ tarefa, aoPressionar }: ItemTarefaProps) {
  return (
    <View style={styles.card}>
      {/* Flex: 1 aqui faz o texto ocupar o espaço restante, empurrando o botão para a direita */}
      <View style={styles.infoContainer}>
        <Text style={[styles.titulo, tarefa.concluida && styles.textoRiscado]}>
          {tarefa.titulo}
        </Text>
        <Text style={styles.descricao}>{tarefa.descricao}</Text>
        <Text style={styles.categoriaTag}>{tarefa.categoria}</Text>
      </View>

      <Pressable 
        style={[styles.botaoStatus, tarefa.concluida ? styles.botaoConcluido : styles.botaoPendente]} 
        onPress={aoPressionar}
      >
        <Text style={styles.textoBotao}>
          {tarefa.concluida ? 'Desfazer' : 'Concluir'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Flexbox: organiza os filhos em linha
    justifyContent: 'space-between', // Flexbox: afasta o texto do botão
    alignItems: 'center', // Flexbox: centraliza verticalmente
    backgroundColor: '#FFF',
    padding: 15, // Tamanho fixo
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  infoContainer: {
    flex: 1, // Tamanho dinâmico: ocupa o espaço que sobrar
    marginRight: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  categoriaTag: {
    fontSize: 12,
    color: '#E91E63',
    fontWeight: '600',
  },
  botaoStatus: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoPendente: {
    backgroundColor: '#4A90E2',
  },
  botaoConcluido: {
    backgroundColor: '#999',
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  }
});