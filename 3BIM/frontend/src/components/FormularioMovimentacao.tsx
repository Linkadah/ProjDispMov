import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Produto } from '../types';

interface FormularioMovimentacaoProps {
  produtos: Produto[];
  onRegistrar: (dados: {
    produtoId: number;
    tipo: 'entrada' | 'saida';
    quantidade: number;
  }) => Promise<void>;
}

export function FormularioMovimentacao({ produtos, onRegistrar }: FormularioMovimentacaoProps) {
  const [produtoId, setProdutoId] = useState<string>('');
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('entrada');
  const [quantidade, setQuantidade] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async () => {
    if (!produtoId || !tipo || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos para registrar a movimentação.');
      return;
    }

    const qtdNum = parseInt(quantidade, 10);

    if (isNaN(qtdNum) || qtdNum <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida.');
      return;
    }

    try {
      setCarregando(true);
      await onRegistrar({
        produtoId: Number(produtoId),
        tipo,
        quantidade: qtdNum,
      });

      // Limpa formulário após registro bem-sucedido
      setProdutoId('');
      setQuantidade('');
      setTipo('entrada');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar a movimentação.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Movimentação</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={produtoId}
          onValueChange={(itemValue) => setProdutoId(itemValue)}
        >
          <Picker.Item label="Selecione um produto..." value="" />
          {produtos.map((prod) => (
            <Picker.Item
              key={prod.id}
              label={`${prod.nome} (Estoque: ${prod.quantidade})`}
              value={prod.id.toString()}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.row}>
        <View style={[styles.pickerContainer, styles.halfInput]}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue as 'entrada' | 'saida')}
          >
            <Picker.Item label="Entrada" value="entrada" />
            <Picker.Item label="Saída" value="saida" />
          </Picker>
        </View>

        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={[styles.botao, carregando && styles.botaoDesabilitado]}
        onPress={handleSubmit}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Registrando...' : 'Registrar Movimentação'}
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
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#94d3a2',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});