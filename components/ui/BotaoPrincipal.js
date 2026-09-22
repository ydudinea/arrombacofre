import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Cores from '../../constants/cores';

function BotaoPrincipal({ children, onPress, icon, style }) {
  return (
    <View style={[styles.containerExternoBotao, style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.containerInternoBotao, styles.pressionado]
            : styles.containerInternoBotao
        }
        onPress={onPress}
        android_ripple={{ color: Cores.primary600 }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={Cores.cream}
          />
        )}
        <Text style={styles.textoBotao}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default BotaoPrincipal;

const styles = StyleSheet.create({
  containerExternoBotao: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  containerInternoBotao: {
    backgroundColor: Cores.primary500,
    paddingVertical: 9,
    paddingHorizontal: 14,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: Cores.cream,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    marginLeft: 7,
  },
  pressionado: {
    opacity: 0.7,
  },
});
