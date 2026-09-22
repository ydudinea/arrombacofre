import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TelaInicio from './screens/TelaInicio';
import TelaJogo from './screens/TelaJogo';
import TelaFimJogo from './screens/TelaFimJogo';
import Cores from './constants/cores';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [numeroUsuario, definirNumeroUsuario] = useState(null);
  const [chaveDificuldade, definirChaveDificuldade] = useState(null);
  const [jogoEncerrado, definirJogoEncerrado] = useState(true);
  const [tentativas, definirTentativas] = useState(0);
  const [melhorTentativas, definirMelhorTentativas] = useState(null);

  const [fontesCarregadas] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function carregarMelhorResultado() {
      try {
        const melhorResultadoSalvo = await AsyncStorage.getItem('cofre-carmesim-recorde');
        if (melhorResultadoSalvo) {
          definirMelhorTentativas(parseInt(melhorResultadoSalvo));
        }
      } catch (error) {
        console.log('Não foi possível carregar o recorde.');
      }
    }

    carregarMelhorResultado();
  }, []);

  const aoOrganizarTela = useCallback(async () => {
    if (fontesCarregadas) {
      await SplashScreen.hideAsync();
    }
  }, [fontesCarregadas]);

  if (!fontesCarregadas) {
    return null;
  }

  function selecionarNumero(numeroEscolhido, dificuldadeSelecionada) {
    definirNumeroUsuario(numeroEscolhido);
    definirChaveDificuldade(dificuldadeSelecionada);
    definirTentativas(0);
    definirJogoEncerrado(false);
  }

  async function encerrarJogo(numeroDeTentativas) {
    definirJogoEncerrado(true);
    definirTentativas(numeroDeTentativas);

    if (melhorTentativas === null || numeroDeTentativas < melhorTentativas) {
      definirMelhorTentativas(numeroDeTentativas);

      try {
        await AsyncStorage.setItem(
          'cofre-carmesim-recorde',
          numeroDeTentativas.toString()
        );
      } catch (error) {
        console.log('Não foi possível salvar o recorde.');
      }
    }
  }

  function iniciarNovoJogo() {
    definirNumeroUsuario(null);
    definirChaveDificuldade(null);
    definirTentativas(0);
    definirJogoEncerrado(true);
  }

  let tela = (
    <TelaInicio
      aoSelecionarNumero={selecionarNumero}
      melhorTentativas={melhorTentativas}
    />
  );

  if (numeroUsuario && !jogoEncerrado) {
    tela = (
      <TelaJogo
        numeroUsuario={numeroUsuario}
        chaveDificuldade={chaveDificuldade}
        aoEncerrarJogo={encerrarJogo}
        aoReiniciar={iniciarNovoJogo}
      />
    );
  }

  if (jogoEncerrado && numeroUsuario) {
    tela = (
      <TelaFimJogo
        numeroUsuario={numeroUsuario}
        numeroDeTentativas={tentativas}
        chaveDificuldade={chaveDificuldade}
        melhorTentativas={melhorTentativas}
        aoIniciarNovoJogo={iniciarNovoJogo}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      <LinearGradient
        colors={[
          Cores.backgroundDark,
          Cores.background,
          Cores.primary500,
        ]}
        style={styles.telaPrincipal}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.telaPrincipal}
          imageStyle={styles.imagemFundo}
        >
          <SafeAreaView
            style={styles.telaPrincipal}
            onLayout={aoOrganizarTela}
          >
            {tela}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  telaPrincipal: {
    flex: 1,
  },
  imagemFundo: {
    opacity: 0.15,
  },
});
