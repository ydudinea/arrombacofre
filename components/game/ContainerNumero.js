import { View, Text, StyleSheet } from 'react-native';

import Cores from '../../constants/cores';

function ContainerNumero({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textoNumero}>{children}</Text>
    </View>
  );
}

export default ContainerNumero;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Cores.accent500,
    backgroundColor: Cores.backgroundDark,
    paddingVertical: 14,
    paddingHorizontal: 28,
    margin: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  textoNumero: {
    color: Cores.cream,
    fontFamily: 'open-sans-bold',
    fontSize: 38,
  },
});
