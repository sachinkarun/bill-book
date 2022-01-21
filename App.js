import React, {useState} from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { StatusBar } from 'react-native';
import Screen from './components/Screen';
import Screen2 from './components/Screen2';
import DarkScreen2 from './components/Screen2Dark';

export default function App() {
  const [dark, setMode] = useState(false);
  return (
    <View style={dark ? (styles.darkContainer) : (styles.container)}>
      <Switch
        style={styles.switchMode}
        rankColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={dark ? '#fff' : '#f4f3f4'}
        onValueChange={() => setMode((prevMode) => !prevMode)}
        value={dark}
      />
      {dark ?
      <StatusBar barStyle="light-content" backgroundColor='rgb(45, 45, 45)'/>
      :
      <StatusBar barStyle="dark-content" backgroundColor='rgb(240, 240, 240)'/>
      }
      <Screen show={dark} />
      {dark ? <DarkScreen2 /> : <Screen2 />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
    alignItems: 'center',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: 'rgb(45, 45, 45)',
    alignItems: 'center',
  },
  switchMode: {
    // backgroundColor:"red",
    marginBottom:-40,
    marginLeft:330
  }
});
