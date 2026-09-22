import { Text, StyleSheet } from 'react-native';

import Cores from '../../constants/cores';

function TextoInstrucao({ children, style }) {
  return (
    <Text style={[styles.textoInstrucaoEstilo, style]}>
      {children}
    </Text>
  );
}

export default TextoInstrucao;

const styles = StyleSheet.create({
  textoInstrucaoEstilo: {
    fontFamily: 'open-sans',
    color: Cores.cream,
    fontSize: 18,
    textAlign: 'center',
  },
});
