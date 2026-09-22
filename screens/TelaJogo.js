import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Titulo from '../components/ui/Titulo';
import ContainerNumero from '../components/game/ContainerNumero';
import BotaoPrincipal from '../components/ui/BotaoPrincipal';
import Cartao from '../components/ui/Cartao';
import TextoInstrucao from '../components/ui/TextoInstrucao';
import ItemHistoricoPalpite from '../components/game/ItemHistoricoPalpite';
import { gerarNumeroAleatorioEntre } from '../utils/numeros';
import { DIFICULDADES } from '../constants/configuracoesJogo';
import Cores from '../constants/cores';

let limiteMinimo = 1;
let limiteMaximo = 100;

function TelaJogo({ numeroUsuario, chaveDificuldade, aoEncerrarJogo, aoReiniciar }) {
  const dificuldade = DIFICULDADES[chaveDificuldade];
  const palpiteInicial = gerarNumeroAleatorioEntre(
    dificuldade.minimo,
    dificuldade.maximo + 1,
    numeroUsuario
  );

  const [palpiteAtual, definirPalpiteAtual] = useState(palpiteInicial);
  const [tentativas, definirTentativas] = useState([palpiteInicial]);

  useEffect(() => {
    limiteMinimo = dificuldade.minimo;
    limiteMaximo = dificuldade.maximo + 1;
  }, [dificuldade]);

  useEffect(() => {
    if (palpiteAtual === numeroUsuario) {
      aoEncerrarJogo(tentativas.length, chaveDificuldade);
    }
  }, [palpiteAtual, numeroUsuario, aoEncerrarJogo, tentativas.length, chaveDificuldade]);

  function proximoPalpite(direcao) {
    if (
      (direcao === 'menor' && palpiteAtual < numeroUsuario) ||
      (direcao === 'maior' && palpiteAtual > numeroUsuario)
    ) {
      Alert.alert(
        'O cofre não mente!',
        'Essa pista contradiz o código secreto. Tente novamente.',
        [{ text: 'Entendi', style: 'cancel' }]
      );
      return;
    }

    if (direcao === 'menor') {
      limiteMaximo = palpiteAtual;
    } else {
      limiteMinimo = palpiteAtual + 1;
    }

    const novoNumeroAleatorio = gerarNumeroAleatorioEntre(
      limiteMinimo,
      limiteMaximo,
      palpiteAtual
    );

    definirPalpiteAtual(novoNumeroAleatorio);
    definirTentativas((tentativasAnteriores) => [
      novoNumeroAleatorio,
      ...tentativasAnteriores,
    ]);
  }

  const quantidadeTentativas = tentativas.length;

  return (
    <View style={styles.tela}>
      <Titulo>Palpite do Guardião</Titulo>

      <TextoInstrucao style={styles.textoDificuldade}>
        {dificuldade.nome} · código de {dificuldade.minimo} a {dificuldade.maximo}
      </TextoInstrucao>

      <ContainerNumero>{palpiteAtual}</ContainerNumero>

      <Cartao>
        <TextoInstrucao style={styles.textoInstrucaoEstilo}>
          O código é maior ou menor?
        </TextoInstrucao>

        <TextoInstrucao>
          Tentativas: {tentativas.length}
        </TextoInstrucao>

        <View style={styles.containerBotoes}>
          <View style={styles.containerBotao}>
            <BotaoPrincipal
              onPress={proximoPalpite.bind(this, 'menor')}
              icon="arrow-down"
            >
              Menor
            </BotaoPrincipal>
          </View>

          <View style={styles.containerBotao}>
            <BotaoPrincipal
              onPress={proximoPalpite.bind(this, 'maior')}
              icon="arrow-up"
            >
              Maior
            </BotaoPrincipal>
          </View>
        </View>

        <BotaoPrincipal onPress={aoReiniciar} icon="refresh">
          Reiniciar
        </BotaoPrincipal>
      </Cartao>

      <View style={styles.containerLista}>
        <FlatList
          data={tentativas}
          renderItem={(dadosItem) => (
          <ItemHistoricoPalpite
            numeroRodada={quantidadeTentativas - dadosItem.index}
            palpite={dadosItem.item}
          />
          )}
          keyExtractor={(item, indice) => `${item}-${indice}`}
        />
      </View>
    </View>
  );
}

export default TelaJogo;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  textoDificuldade: {
    color: Cores.cream,
    marginTop: 8,
    fontSize: 15,
  },
  textoInstrucaoEstilo: {
    marginBottom: 12,
  },
  containerBotoes: {
    flexDirection: 'row',
    width: '100%',
  },
  containerBotao: {
    flex: 1,
  },
  containerLista: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
});
