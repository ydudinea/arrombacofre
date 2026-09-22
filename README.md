# Arromba cofre

Jogo em React Native de Eduarda e Emanuel

## Sobre

O jogador escolhe um código secreto e o Guardião do Cofre tenta descobri-lo.
A cada palpite, o jogador informa se o código é **maior** ou **menor**. O
intervalo é reduzido progressivamente usando a mesma lógica de busca binária
trabalhada nas aulas.

### Modos de dificuldade

- **Fácil:** 1 a 50
- **Difícil:** 1 a 99
- **Insano:** 1 a 200

O modo Difícil é o padrão e mantém a faixa principal de 1 a 99 do projeto.

## Recursos do projeto

- Navegação entre três telas por estado, sem biblioteca de navegação.
- `TextInput` controlado e validação com `parseInt`, `isNaN`, limite mínimo e máximo.
- `Alert` para entrada inválida e para pistas contraditórias.
- `BotaoPrincipal` com `Pressable`, `android_ripple`, opacity e Double Container Pattern.
- Flexbox, `flex: 1` e dois botões lado a lado.
- Fundo em três camadas: `LinearGradient` + `ImageBackground` + telas.
- `cores.js` como ponto único da paleta.
- Componentes reutilizáveis com `props.children`.
- Busca binária com `.bind()` e limites fora do componente.
- Guarda temática: **"O cofre não mente!"**
- `useEffect` para detectar a vitória.
- `FlatList` com histórico dos palpites.
- Ícones do `@expo/vector-icons`.
- Fontes Open Sans carregadas com `useFonts` e splash controlada.
- Tela final com círculo, destaque de valores e animação.
- ★★★ conforme o número de tentativas.
- Recorde da sessão e recorde salvo no aparelho com AsyncStorage.
- Som e vibração ao abrir o cofre.
- Paleta em bege, vermelho e marrom avermelhado.

## Como instalar

Pré-requisitos:

- Node.js 20.19+.
- Expo Go no celular.

Dentro da pasta do projeto:

```bash
npm install
npx expo install --fix
```

Se o Expo solicitar versões compatíveis das dependências, use:

```bash
npx expo install expo-audio expo-haptics @react-native-async-storage/async-storage
```

## Como iniciar

```bash
npx expo start
```

Depois, leia o QR Code pelo Expo Go.

## Estrutura

```text
o-cofre-carmesim/
├── App.js
├── screens/
│   ├── TelaInicio.js
│   ├── TelaJogo.js
│   └── TelaFimJogo.js
├── components/
│   ├── ui/
│   │   ├── BotaoPrincipal.js
│   │   ├── Title.js
│   │   ├── Card.js
│   │   └── TextoInstrucao.js
│   └── game/
│       ├── ContainerNumero.js
│       └── ItemHistoricoPalpite.js
├── constants/
│   ├── cores.js
│   └── game.js
├── utils/
│   └── numbers.js
└── assets/
    ├── images/
    │   └── background.png
    ├── sounds/
    │   └── vitoria.wav
    └── fonts/
```

## Como jogar

1. Escolha a dificuldade.
2. Digite um código dentro do intervalo indicado.
3. O Guardião fará um palpite.
4. Toque em **Menor** ou **Maior** para dar a pista correta.
5. Continue até o código ser encontrado.
6. Ao abrir o cofre, veja as estrelas, o número de tentativas e o recorde.
7. Toque em **Novo código** para jogar novamente.

