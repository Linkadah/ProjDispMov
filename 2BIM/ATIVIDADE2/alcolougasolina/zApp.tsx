import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';

// RNF02: Tipos explícitos, sem uso de 'any'
type OpcaoCombustivel = 'Álcool' | 'Gasolina' | null;

export default function App() {
  // Estados tipados
  const [precoAlcool, setPrecoAlcool] = useState<string>('');
  const [precoGasolina, setPrecoGasolina] = useState<string>('');
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [recomendacao, setRecomendacao] = useState<OpcaoCombustivel>(null);

  // Função para formatar exibição de moeda na tela de resultado
  const formatarMoeda = (valor: string): string => {
    const numero = parseFloat(valor.replace(',', '.'));
    return isNaN(numero) ? '0.00' : numero.toFixed(2).replace('.', ',');
  };

  // RF02 e RF06: Disparo do cálculo e validação
  const handleCalcular = (): void => {
    // Validação de campos vazios
    if (!precoAlcool.trim() || !precoGasolina.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha os preços do álcool e da gasolina.');
      return;
    }

    // Trocando vírgula por ponto para garantir o parse correto no padrão brasileiro
    const valorAlcool = parseFloat(precoAlcool.replace(',', '.'));
    const valorGasolina = parseFloat(precoGasolina.replace(',', '.'));

    // Validação de números inválidos ou menores/iguais a zero
    if (isNaN(valorAlcool) || isNaN(valorGasolina) || valorAlcool <= 0 || valorGasolina <= 0) {
      Alert.alert('Erro', 'Digite valores numéricos válidos e maiores que zero.');
      return;
    }

    // RF03: Regra de negócio (Regra dos 70%)
    const fator = valorAlcool / valorGasolina;
    if (fator < 0.7) {
      setRecomendacao('Álcool');
    } else {
      setRecomendacao('Gasolina');
    }

    setMostrarResultado(true);
  };

  // RF05: Voltar para a tela de entrada limpando os estados
  const handleRecalcular = (): void => {
    setMostrarResultado(false);
    setPrecoAlcool('');
    setPrecoGasolina('');
    setRecomendacao(null);
  };

  // ==========================================
  // TELA 2 — RESULTADO
  // ==========================================
  if (mostrarResultado) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.card}>
          <Text style={styles.icon}>⛽</Text>
          <Text style={styles.titleResult}>Compensa usar</Text>
          
          <Text 
            style={[
              styles.highlightText, 
              recomendacao === 'Álcool' ? styles.colorAlcool : styles.colorGasolina
            ]}
          >
            {recomendacao}
          </Text>

          {/* RF04: Resumo dos preços informados */}
          <View style={styles.pricesBlock}>
            <Text style={styles.pricesTitle}>Com os preços:</Text>
            <Text style={styles.priceText}>Álcool: R$ {formatarMoeda(precoAlcool)}</Text>
            <Text style={styles.priceText}>Gasolina: R$ {formatarMoeda(precoGasolina)}</Text>
          </View>

          {/* RF05: Botão de calcular novamente */}
          <TouchableOpacity style={styles.buttonOutline} onPress={handleRecalcular}>
            <Text style={styles.buttonOutlineText}>Calcular novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // TELA 1 — ENTRADA
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.icon}>⛽</Text>
        <Text style={styles.title}>Qual melhor opção?</Text>

        {/* RF01 e RNF03: Campos numéricos */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Álcool (preço por litro)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 4,29"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={precoAlcool}
            onChangeText={setPrecoAlcool}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gasolina (preço por litro)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 6,92"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={precoGasolina}
            onChangeText={setPrecoGasolina}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCalcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// RNF04: Layout tema escuro, cartão centralizado, botão de destaque
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214', // Fundo escuro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#202024', // Cartão central
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    color: '#E1E1E6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#C4C4CC',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#121214',
    color: '#E1E1E6',
    borderWidth: 1,
    borderColor: '#323238',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#00875F', // Botão de destaque (verde)
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilos da Tela 2 (Resultado)
  titleResult: {
    color: '#E1E1E6',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  highlightText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  colorAlcool: {
    color: '#00B37E', // Verde para álcool
  },
  colorGasolina: {
    color: '#FBA94C', // Laranja/Amarelo para gasolina
  },
  pricesBlock: {
    backgroundColor: '#121214',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#323238',
  },
  pricesTitle: {
    color: '#C4C4CC',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceText: {
    color: '#8D8D99',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 4,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#00875F',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#00B37E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});