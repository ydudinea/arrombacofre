import { Text, StyleSheet } from 'react-native';

import Cores from '../../constants/cores';

function Titulo({ children }) {
  return <Text style={styles.titulo}>{children}</Text>;
}

export default Titulo;

const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    color: Cores.cream,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Cores.accent500,
    backgroundColor: Cores.backgroundDark,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 16,
    maxWidth: '90%',
  },
});