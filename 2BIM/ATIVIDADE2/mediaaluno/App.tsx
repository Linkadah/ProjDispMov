import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

// Importações dos tipos, estilos e componentes
import { RegistroCalculo, Situacao } from './src/types/registro';
import { styles } from './src/styles/styles';
import { CardResultado } from './src/components/CardResultado';
import { ItemHistorico } from './src/components/ItemHistorico';

// RNF03: Estado tipado
interface AppState {
  nota1: string;
  nota2: string;
  nota3: string;
  resultadoAtual: RegistroCalculo | null;
  historico: RegistroCalculo[];
}

// RNF02: Componente de Classe
export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      nota1: '',
      nota2: '',
      nota3: '',
      resultadoAtual: null,
      historico: [],
    };
  }

  // RF02 e RF05: Cálculo e Validação
// RF02 e RF05: Cálculo e Validação
  handleCalcular = () => {
    // 1. Aqui pegamos o estado UMA ÚNICA VEZ
    const { nota1, nota2, nota3 } = this.state;

    console.log("O botão FOI CLICADO! Notas:", nota1, nota2, nota3);

    // 2. Como você está na WEB, trocamos Alert.alert() por alert() simples do navegador
    if (!nota1.trim() || !nota2.trim() || !nota3.trim()) {
      alert('Atenção: Por favor, preencha as 3 notas.');
      return;
    }

    // Conversão substituindo vírgula por ponto
    const n1 = parseFloat(nota1.replace(',', '.'));
    const n2 = parseFloat(nota2.replace(',', '.'));
    const n3 = parseFloat(nota3.replace(',', '.'));

    // Validação de números e intervalo 0 a 10 (RF05)
    if (
      isNaN(n1) || isNaN(n2) || isNaN(n3) ||
      n1 < 0 || n1 > 10 ||
      n2 < 0 || n2 > 10 ||
      n3 < 0 || n3 > 10
    ) {
      alert('Erro: As notas devem ser números válidos entre 0 e 10.');
      return;
    }

    // Regra de negócio (Cálculo da média)
    const media = (n1 + n2 + n3) / 3;
    let situacao: Situacao = 'Reprovado';

    if (media >= 7.0) situacao = 'Aprovado';
    else if (media >= 5.0) situacao = 'Recuperação';

    const novoRegistro: RegistroCalculo = {
      id: Date.now().toString(),
      notas: [n1, n2, n3],
      media,
      situacao,
    };

    // Atualizando estado (RF06: Salvando histórico)
    this.setState((prevState) => ({
      resultadoAtual: novoRegistro,
      historico: [novoRegistro, ...prevState.historico],
      nota1: '', // Limpa os campos após o cálculo
      nota2: '',
      nota3: '',
    }));
  };

  // RF09: Limpar histórico
  handleLimparHistorico = () => {
    this.setState({ historico: [], resultadoAtual: null });
  };

  // Renderiza os Blocos 1 e 2 no cabeçalho da lista
  renderHeader = () => {
    const { nota1, nota2, nota3, resultadoAtual } = this.state;

    return (
      <View>
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Situação do Aluno</Text>

          <View style={styles.inputRow}>
            {/* RF01 e RNF06: Três campos numéricos */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nota 1</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={4}
                value={nota1}
                onChangeText={(texto) => this.setState({ nota1: texto })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nota 2</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={4}
                value={nota2}
                onChangeText={(texto) => this.setState({ nota2: texto })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nota 3</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={4}
                value={nota3}
                onChangeText={(texto) => this.setState({ nota3: texto })}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btnCalcular} onPress={this.handleCalcular}>
            <Text style={styles.btnCalcularTexto}>Calcular média</Text>
          </TouchableOpacity>
        </View>

        {/* Bloco 2 - Renderização Condicional */}
        {resultadoAtual && <CardResultado resultado={resultadoAtual} />}

        {/* Título do Histórico se houver itens */}
        {this.state.historico.length > 0 && (
          <Text style={styles.cabecalhoLista}>Histórico de cálculos</Text>
        )}
      </View>
    );
  };

  // RF08: Rodapé com total e botão
  renderFooter = () => {
    const total = this.state.historico.length;
    if (total === 0) return null;

    return (
      <View style={styles.rodapeContainer}>
        <Text style={styles.rodapeTexto}>Total: {total} {total === 1 ? 'cálculo' : 'cálculos'}</Text>
        <TouchableOpacity style={styles.btnLimpar} onPress={this.handleLimparHistorico}>
          <Text style={styles.btnLimparTexto}>Limpar histórico</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* RF07: FlatList como rolagem principal */}
        <FlatList
          data={this.state.historico}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => <ItemHistorico registro={item} />}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
          ListFooterComponent={this.renderFooter}
          keyboardShouldPersistTaps="handled" // Correção do teclado e do toque duplo adicionada aqui!
        />
      </SafeAreaView>
    );
  }
}