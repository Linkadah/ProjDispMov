import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Movimentacao } from '../types';

interface ListaMovimentacoesProps {
  movimentacoes: Movimentacao[];
}

export function ListaMovimentacoes({ movimentacoes }: ListaMovimentacoesProps) {
  if (movimentacoes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma movimentação registrada.</Text>
      </View>
    );
  }

  const formatarData = (dataIso: string) => {
    const data = new Date(dataIso);
    return data.toLocaleString('pt-BR');
  };

  return (
    <FlatList
      data={movimentacoes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isEntrada = item.tipo.toLowerCase() === 'entrada';
        return (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.produtoNome}>{item.produtoNome}</Text>
              <View
                style={[
                  styles.badge,
                  isEntrada ? styles.badgeEntrada : styles.badgeSaida,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isEntrada ? styles.textEntrada : styles.textSaida,
                  ]}
                >
                  {isEntrada ? 'ENTRADA' : 'SAÍDA'}
                </Text>
              </View>
            </View>

            <View style={styles.detalhes}>
              <Text style={styles.info}>Quantidade: {item.quantidade} un.</Text>
              <Text style={styles.data}>{formatarData(item.data)}</Text>
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeEntrada: {
    backgroundColor: '#e6f4ea',
  },
  badgeSaida: {
    backgroundColor: '#fce8e6',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textEntrada: {
    color: '#137333',
  },
  textSaida: {
    color: '#c5221f',
  },
  detalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  data: {
    fontSize: 12,
    color: '#888',
  },
});