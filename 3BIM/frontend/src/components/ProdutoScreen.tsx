import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { produtoApi, categoriaApi } from '../api/api';
import { Produto, Categoria } from '../types';
import { ListaProdutos } from '../components/ListaProdutos';
import { FormularioProduto } from '../components/FormularioProduto';
import { BotaoSair } from '../components/BotaoSair';

export function ProdutosScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      const [listaProdutos, listaCategorias] = await Promise.all([
        produtoApi.listar(),
        categoriaApi.listar(),
      ]);
      setProdutos(listaProdutos);
      setCategorias(listaCategorias);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar dados de produtos e categorias.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleCadastrarProduto = async (dados: {
    nome: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
  }) => {
    await produtoApi.criar(dados);
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
          <FormularioProduto
            categorias={categorias}
            onCadastrar={handleCadastrarProduto}
          />
          <ListaProdutos produtos={produtos} />
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