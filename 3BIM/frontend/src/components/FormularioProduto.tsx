import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Categoria } from '../types';

interface FormularioProdutoProps {
  categorias: Categoria[];
  onCadastrar: (dados: {
    nome: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
  }) => Promise<void>;
}

export function FormularioProduto({ categorias, onCadastrar }: FormularioProdutoProps) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoriaId, setCategoriaId] = useState<string>('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async () => {
    if (!nome.trim() || !preco.trim() || !quantidade.trim() || !categoriaId) {
      Alert.alert('Atenção', 'Preencha todos os campos para cadastrar o produto.');
      return;
    }

    const precoNum = parseFloat(preco.replace(',', '.'));
    const qtdNum = parseInt(quantidade, 10);

    if (isNaN(precoNum) || precoNum <= 0) {
      Alert.alert('Erro', 'Informe um preço válido.');
      return;
    }

    if (isNaN(qtdNum) || qtdNum < 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida.');
      return;
    }

    try {
      setCarregando(true);
      await onCadastrar({
        nome: nome.trim(),
        preco: precoNum,
        quantidade: qtdNum,
        categoriaId: Number(categoriaId),
      });

      // Limpa os campos após o envio com sucesso
      setNome('');
      setPreco('');
      setQuantidade('');
      setCategoriaId('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Preço (ex: 8.50)"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Qtd. inicial"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoriaId}
          onValueChange={(itemValue) => setCategoriaId(itemValue)}
        >
          <Picker.Item label="Selecione uma categoria..." value="" />
          {categorias.map((cat) => (
            <Picker.Item key={cat.id} label={cat.nome} value={cat.id.toString()} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.botao, carregando && styles.botaoDesabilitado]}
        onPress={handleSubmit}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Cadastrando...' : 'Cadastrar Produto'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#a0c4ff',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});