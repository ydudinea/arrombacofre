import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BotaoPrincipal from '../components/ui/BotaoPrincipal';
import Titulo from '../components/ui/Titulo';
import Cartao from '../components/ui/Cartao';
import TextoInstrucao from '../components/ui/TextoInstrucao';
import Cores from '../constants/cores';
import { DIFICULDADES, DIFICULDADE_PADRAO } from '../constants/configuracoesJogo';

function TelaInicio({ aoSelecionarNumero, melhorTentativas }) {
  const [numeroDigitado, definirNumeroDigitado] = useState('');
  const [chaveDificuldade, definirChaveDificuldade] = useState(DIFICULDADE_PADRAO);

  const dificuldade = DIFICULDADES[chaveDificuldade];

  function alterarNumeroDigitado(textoDigitado) {
    definirNumeroDigitado(textoDigitado);
  }

  function limparEntrada() {
    definirNumeroDigitado('');
  }

  function selecionarDificuldade(key) {
    definirChaveDificuldade(key);
    definirNumeroDigitado('');
  }

  function confirmarEntrada() {
    const numeroEscolhido = parseInt(numeroDigitado);

    if (isNaN(numeroEscolhido) || numeroEscolhido <= 0 || numeroEscolhido > dificuldade.maximo) {
      Alert.alert(
        'Código inválido',
        `Digite um código entre ${dificuldade.minimo} e ${dificuldade.maximo}.`,
        [{ text: 'Entendi', style: 'default', onPress: limparEntrada }]
      );
      return;
    }

    aoSelecionarNumero(numeroEscolhido, chaveDificuldade);
  }

  return (
    <View style={styles.containerPrincipal}>
      <Titulo>Arromba o cofre</Titulo>

      <TextoInstrucao style={styles.subtitulo}>
        Escolha o código secreto do cofre.
      </TextoInstrucao>

      <Cartao>
        <TextoInstrucao>
          {dificuldade.descricao}
        </TextoInstrucao>

        <View style={styles.containerDificuldade}>
          {Object.values(DIFICULDADES).map((item) => (
            <View key={item.chave} style={styles.botaoDificuldade}>
              <BotaoPrincipal
                onPress={selecionarDificuldade.bind(this, item.chave)}
                icon={item.chave === chaveDificuldade ? 'lock-open' : 'lock-closed'}
              >
                {item.nome}
              </BotaoPrincipal>
            </View>
          ))}
        </View>

        <TextInput
          style={styles.entradaNumero}
          maxLength={dificuldade.maximo > 99 ? 3 : 2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={alterarNumeroDigitado}
          value={numeroDigitado}
          placeholder="?"
          placeholderTextColor={Cores.accent700}
        />

        <View style={styles.containerBotoes}>
          <View style={styles.containerBotao}>
            <BotaoPrincipal onPress={limparEntrada} icon="refresh">
              Limpar
            </BotaoPrincipal>
          </View>

          <View style={styles.containerBotao}>
            <BotaoPrincipal onPress={confirmarEntrada} icon="key">
              Confirmar
            </BotaoPrincipal>
          </View>
        </View>
      </Cartao>

      <View style={styles.containerRecorde}>
        <Ionicons name="trophy-outline" size={18} color={Cores.accent500} />
        <Text style={styles.textoRecorde}>
          Recorde: {melhorTentativas ? `${melhorTentativas} tentativas` : 'ainda não registrado'}
        </Text>
      </View>
    </View>
  );
}

export default TelaInicio;

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    marginTop: 22,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  subtitulo: {
    color: Cores.cream,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  containerDificuldade: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  botaoDificuldade: {
    flex: 1,
  },
  entradaNumero: {
    height: 58,
    width: 82,
    fontSize: 34,
    fontFamily: 'open-sans-bold',
    color: Cores.textDark,
    borderWidth: 2,
    borderColor: Cores.accent700,
    backgroundColor: Cores.white,
    borderRadius: 12,
    marginVertical: 14,
    textAlign: 'center',
  },
  containerBotoes: {
    flexDirection: 'row',
    marginTop: 4,
    width: '100%',
  },
  containerBotao: {
    flex: 1,
  },
  containerRecorde: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  textoRecorde: {
    fontFamily: 'open-sans',
    color: Cores.cream,
    marginLeft: 7,
  },
});
