// import { useLayoutEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { BotaoSair } from '../components/BotaoSair';

// // TODO (atividade dos alunos): implementar a tela de Movimentações.
// // A API já está pronta em `movimentacaoApi` (src/api/api.ts):
// //   - movimentacaoApi.listar(): Promise<Movimentacao[]>
// //   - movimentacaoApi.criar({ produtoId, tipo, quantidade }): Promise<Movimentacao>
// // Usem CategoriasScreen.tsx como referência de estrutura (listagem + formulário).

// export function MovimentacoesScreen() {
//   const navigation = useNavigation();

//   useLayoutEffect(() => {
//     navigation.setOptions({ headerRight: () => <BotaoSair /> });
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titulo}>Movimentações</Text>
//       <Text style={styles.aviso}>Tela ainda não implementada.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
//   aviso: { color: '#666' },
// });

import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { movimentacaoApi, produtoApi } from '../api/api';
import { Movimentacao, Produto } from '../types';
import { ListaMovimentacoes } from '../components/ListaMovimentacoes';
import { FormularioMovimentacao } from '../components/FormularioMovimentacao';
import { BotaoSair } from '../components/BotaoSair';

export function MovimentacoesScreen() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = useCallback(async () => {
  try {
    setCarregando(true);
    // Procura a lista de movimentações e a lista de produtos ao mesmo tempo
    const [listaMovimentacoes, listaProdutos] = await Promise.all([
      movimentacaoApi.listar(),
      produtoApi.listar(),
    ]);

    setMovimentacoes(listaMovimentacoes);
    setProdutos(listaProdutos);
  } catch (error) {
    Alert.alert('Erro', 'Falha ao carregar movimentações e produtos.');
  } finally {
    setCarregando(false);
  }
}, []);
  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleRegistrarMovimentacao = async (dados: {
    produtoId: number;
    tipo: 'entrada' | 'saida';
    quantidade: number;
  }) => {
    await movimentacaoApi.criar(dados);
    await carregarDados();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRight}>
        <BotaoSair />
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <View style={styles.content}>
          <FormularioMovimentacao
            produtos={produtos}
            onRegistrar={handleRegistrarMovimentacao}
          />
          <ListaMovimentacoes movimentacoes={movimentacoes} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});