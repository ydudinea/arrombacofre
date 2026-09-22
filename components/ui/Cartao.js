import { View, StyleSheet, Dimensions, Platform } from 'react-native';

import Cores from '../../constants/cores';

function Cartao({ children }) {
  return <View style={styles.cartao}>{children}</View>;
}

export default Cartao;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 30,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: Cores.cream,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Cores.accent600,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: Cores.backgroundDark,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 0.35,
      },
    }),
  },
});
