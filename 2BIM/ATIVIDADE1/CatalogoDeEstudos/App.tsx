import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, Pressable } from 'react-native';
import { estilosGlobais, Tarefa, Categoria } from './src/styles/globais';
import { ItemTarefa } from './src/components/ItemTarefa/ItemTarefa';

// Dados iniciais (mock)
const DADOS_INICIAIS: Tarefa[] = [
  { id: '1', titulo: 'Estudar React Native', descricao: 'Revisar componentes e FlatList', categoria: 'Estudo', concluida: false },
  { id: '2', titulo: 'Entregar EAP e Diagramas', descricao: 'Finalizar atividade de gerência de projetos', categoria: 'Estudo', concluida: false },
  { id: '3', titulo: 'Reunião do TCC', descricao: 'Alinhar objetivos com o orientador', categoria: 'Trabalho', concluida: false },
  { id: '4', titulo: 'Comprar café', descricao: 'Passar no mercado voltando do IF', categoria: 'Pessoal', concluida: false },
  { id: '5', titulo: 'Modelagem do Banco', descricao: 'Criar diagrama entidade-relacionamento', categoria: 'Estudo', concluida: false },
  { id: '6', titulo: 'Férias', descricao: 'Ir ao cinema', categoria: 'Pessoal', concluida: false },
];

const CATEGORIAS: Categoria[] = ['Todas', 'Estudo', 'Trabalho', 'Pessoal'];

export default function App() {
  // State 1: Controla as tarefas (permite alterar o status de concluído)
  const [tarefas, setTarefas] = useState<Tarefa[]>(DADOS_INICIAIS);
  
  // State 2: Controla o filtro de categoria selecionado
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>('Todas');

  // State 3: Contador de interações (exigência da atividade)
  const [interacoes, setInteracoes] = useState(0);

  // Função para alterar o status da tarefa
  const alternarStatusTarefa = (id: string) => {
    setTarefas(tarefasAtuais => 
      tarefasAtuais.map(tarefa => 
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
    setInteracoes(interacoes + 1); // Atualiza o contador de cliques
  };

  // Filtra a lista com base na categoria selecionada no ScrollView
  const tarefasFiltradas = tarefas.filter(tarefa => 
    categoriaAtiva === 'Todas' || tarefa.categoria === categoriaAtiva
  );

  return (
    <View style={estilosGlobais.container}>
      
      {/* Título e Subtítulo */}
      <View style={estilosGlobais.cabecalho}>
        <Text style={estilosGlobais.tituloPrincipal}>Otta App</Text>
        <Text style={estilosGlobais.subtitulo}>Seu catálogo de estudos e tarefas</Text>
        <Text style={{ marginTop: 5, color: '#888' }}>
          Interações na sessão: {interacoes}
        </Text>
      </View>

      {/* ScrollView Horizontal para os filtros */}
      <View style={{ height: 50 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilosGlobais.scrollCategorias}
        >
          {CATEGORIAS.map(categoria => (
            <Pressable 
              key={categoria}
              style={[
                estilosGlobais.btnCategoria, 
                categoriaAtiva === categoria && estilosGlobais.btnCategoriaAtivo
              ]}
              onPress={() => setCategoriaAtiva(categoria)}
            >
              <Text style={[
                estilosGlobais.txtCategoria,
                categoriaAtiva === categoria && estilosGlobais.txtCategoriaAtivo
              ]}>
                {categoria}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* FlatList para exibir as tarefas */}
      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilosGlobais.listaContainer}
        renderItem={({ item }) => (
          <ItemTarefa 
            tarefa={item} 
            aoPressionar={() => alternarStatusTarefa(item.id)} 
          />
        )}
      />
    </View>
  );
}