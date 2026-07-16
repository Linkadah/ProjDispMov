// src/components/ItemHistorico.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { RegistroCalculo } from '../types/registro';
import { styles } from '../styles/styles';

interface ItemHistoricoProps {
  registro: RegistroCalculo;
}

export const ItemHistorico = ({ registro }: ItemHistoricoProps) => {
  const getBordaSituacao = () => {
    switch (registro.situacao) {
      case 'Aprovado': return styles.bordaAprovado;
      case 'Recuperação': return styles.bordaRecuperacao;
      case 'Reprovado': return styles.bordaReprovado;
      default: return {};
    }
  };

  return (
    <View style={[styles.itemHistorico, getBordaSituacao()]}>
      <View style={styles.linhaItem}>
        <Text style={styles.textoItem}>Notas:</Text>
        <Text style={styles.textoItemDestaque}>
          {registro.notas.join(' / ')}
        </Text>
      </View>
      <View style={styles.linhaItem}>
        <Text style={styles.textoItem}>Média: <Text style={styles.textoItemDestaque}>{registro.media.toFixed(1)}</Text></Text>
        <Text style={[styles.textoItem, styles.textoItemDestaque, 
          registro.situacao === 'Aprovado' ? styles.corAprovado : 
          registro.situacao === 'Recuperação' ? styles.corRecuperacao : 
          styles.corReprovado
        ]}>
          {registro.situacao}
        </Text>
      </View>
    </View>
  );
};