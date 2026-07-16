// src/components/CardResultado.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { RegistroCalculo } from '../types/registro';
import { styles } from '../styles/styles';

interface CardResultadoProps {
  resultado: RegistroCalculo;
}

export const CardResultado = ({ resultado }: CardResultadoProps) => {
  // RF04: Estilo condicional
  const getCorSituacao = () => {
    switch (resultado.situacao) {
      case 'Aprovado': return styles.corAprovado;
      case 'Recuperação': return styles.corRecuperacao;
      case 'Reprovado': return styles.corReprovado;
      default: return {};
    }
  };

  return (
    <View style={styles.cardResultado}>
      <View style={styles.linhaResultado}>
        <Text style={styles.textoResultadoLabel}>Média Final:</Text>
        <Text style={styles.textoResultadoValor}>{resultado.media.toFixed(1)}</Text>
      </View>
      <View style={styles.linhaResultado}>
        <Text style={styles.textoResultadoLabel}>Situação:</Text>
        <Text style={[styles.textoResultadoValor, getCorSituacao()]}>
          {resultado.situacao}
        </Text>
      </View>
    </View>
  );
};