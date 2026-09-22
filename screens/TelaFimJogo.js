import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';

import Titulo from '../components/ui/Titulo';
import BotaoPrincipal from '../components/ui/BotaoPrincipal';
import Cores from '../constants/cores';
import { obterEstrelas, DIFICULDADES } from '../constants/configuracoesJogo';

function TelaFimJogo({
  numeroDeTentativas,
  numeroUsuario,
  chaveDificuldade,
  melhorTentativas,
  aoIniciarNovoJogo,
}) {
  const escala = useRef(new Animated.Value(0.6)).current;
  const opacidade = useRef(new Animated.Value(0)).current;
  const reprodutor = useAudioPlayer(require('../assets/sounds/vitoria.wav'));

  const estrelas = obterEstrelas(numeroDeTentativas, chaveDificuldade);
  const dificuldade = DIFICULDADES[chaveDificuldade];

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    reprodutor.seekTo(0);
    reprodutor.play();

    Animated.parallel([
      Animated.spring(escala, {
        toValue: 1,
        friction: 5,
        tension: 55,
        useNativeDriver: true,
      }),
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [reprodutor]);

  return (
    <View style={styles.containerPrincipal}>
      <Titulo>Cofre aberto!</Titulo>

      <Animated.View
        style={[
          styles.containerImagem,
          {
            transform: [{ scale: escala }],
            opacity: opacidade,
          },
        ]}
      >
        <Ionicons name="lock-open" size={92} color={Cores.textDark} />
      </Animated.View>

      <Text style={styles.textoEstrelas}>
        {'★'.repeat(estrelas)}{'☆'.repeat(3 - estrelas)}
      </Text>

      <Text style={styles.textoResumo}>
        O Guardião precisou de{' '}
        <Text style={styles.destaque}>{numeroDeTentativas}</Text> tentativas para
        descobrir o código{' '}
        <Text style={styles.destaque}>{numeroUsuario}</Text>.
      </Text>

      <Text style={styles.textoExtra}>
        Dificuldade: {dificuldade.nome}
      </Text>

      <Text style={styles.textoExtra}>
        Recorde da sessão: {melhorTentativas} tentativa{melhorTentativas === 1 ? '' : 's'}
      </Text>

      <BotaoPrincipal onPress={aoIniciarNovoJogo} icon="refresh">
        Novo código
      </BotaoPrincipal>
    </View>
  );
}

export default TelaFimJogo;

const deviceWidth = Dimensions.get('window').width;
const circleSize = deviceWidth < 380 ? 190 : 230;

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImagem: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: 4,
    borderColor: Cores.accent500,
    backgroundColor: Cores.cream,
    overflow: 'hidden',
    margin: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  textoEstrelas: {
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    color: Cores.accent500,
    letterSpacing: 4,
    marginBottom: 12,
  },
  textoResumo: {
    fontFamily: 'open-sans',
    fontSize: 21,
    textAlign: 'center',
    color: Cores.cream,
    marginBottom: 10,
  },
  destaque: {
    fontFamily: 'open-sans-bold',
    color: Cores.accent500,
  },
  textoExtra: {
    fontFamily: 'open-sans',
    color: Cores.cream,
    fontSize: 15,
    marginBottom: 5,
  },
});
