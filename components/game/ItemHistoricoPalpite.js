import { View, Text, StyleSheet, Platform } from 'react-native';

import Cores from '../../constants/cores';

function ItemHistoricoPalpite({ numeroRodada, palpite }) {
  return (
    <View style={styles.itemLista}>
      <Text style={styles.textoItem}>#{numeroRodada}</Text>
      <Text style={styles.textoItem}>Código: {palpite}</Text>
    </View>
  );
}

export default ItemHistoricoPalpite;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Cores.accent700,
    borderWidth: 1,
    borderRadius: 16,
    padding: 11,
    marginVertical: 5,
    backgroundColor: Cores.cream,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: Cores.backgroundDark,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  textoItem: {
    fontFamily: 'open-sans',
    color: Cores.cream,
  },
});
