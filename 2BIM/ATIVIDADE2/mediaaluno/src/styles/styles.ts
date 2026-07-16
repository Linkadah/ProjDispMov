// src/styles/styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Layout Principal
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  
  // Bloco 1 - Formulário
  formContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#111827',
    textAlign: 'center',
  },
  btnCalcular: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCalcularTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Bloco 2 e 3 - Resultados e Histórico
  cardResultado: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  linhaResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  textoResultadoLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
  },
  textoResultadoValor: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  // Cores Condicionais da Situação (RF04)
  corAprovado: { color: '#10B981' }, // Verde
  corRecuperacao: { color: '#F59E0B' }, // Laranja/Amarelo
  corReprovado: { color: '#EF4444' }, // Vermelho

  // Lista
  cabecalhoLista: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  itemHistorico: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 6,
  },
  bordaAprovado: { borderLeftColor: '#10B981' },
  bordaRecuperacao: { borderLeftColor: '#F59E0B' },
  bordaReprovado: { borderLeftColor: '#EF4444' },
  linhaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textoItem: {
    color: '#4B5563',
    fontSize: 14,
  },
  textoItemDestaque: {
    fontWeight: 'bold',
  },
  separador: {
    height: 12,
  },
  
  // Rodapé
  rodapeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  rodapeTexto: {
    color: '#6B7280',
    marginBottom: 12,
    fontSize: 14,
  },
  btnLimpar: {
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnLimparTexto: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
});