import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Produto } from '../types';

interface ListaProdutosProps {
  produtos: Produto[];
}

export function ListaProdutos({ produtos }: ListaProdutosProps) {
  if (produtos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.id}>#{item.id}</Text>
            <Text style={styles.nome}>{item.nome}</Text>
          </View>
          <View style={styles.detalhes}>
            <Text style={styles.info}>Categoria: {item.categoriaNome}</Text>
            <Text style={styles.info}>
              Preço: R$ {item.preco.toFixed(2).replace('.', ',')}
            </Text>
            <Text style={styles.info}>Estoque: {item.quantidade} un.</Text>
          </View>
        </View>
      )}
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
    alignItems: 'center',
    marginBottom: 8,
  },
  id: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detalhes: {
    gap: 4,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
});