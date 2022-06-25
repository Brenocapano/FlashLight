import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Switch
}
 from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
const App = () => {
  const [state, setState] = useState({
    light: false,
    switch: false,
    shake: false,
  });
  const toggleSwitch = () => setState(previousState => {
    return {
      light: !previousState.light,
      switch: !previousState.switch,
    }
  });

  useEffect(() => {
    //liga flash do celular
    Torch.switchState(state.light);
    [state.light]
  })
  useEffect(() => {
    const subscription = RNShake.addListener(toggleSwitch);
    // função chamada quando o componente for desmontado.
    return () => subscription.remove();
  }, []);
 
  return (
    <View style={state.light ? style.containerLight : style.container}>

      <Image
        style={state.light
          ? style.lightingOn
          : style.lightingOff}
        source={
          state.light
            ? require('./assets/icons/LampOn.png')
            : require('./assets/icons/LampOff.png')
        }
      />
      <Switch style={style.switchStyle}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={state.switch ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={state.switch}
      />



    </View>
  );
};
export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 160,
    height: 160,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 160,
    height: 160,
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
  switchStyle: {
    marginTop: 30,
    esizeMode: 'contain',
    alignSelf: 'center',
  }

})
