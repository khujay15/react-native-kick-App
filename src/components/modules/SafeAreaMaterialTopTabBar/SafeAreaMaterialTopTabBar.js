import React from 'react';
import { SafeAreaView } from 'react-native';
import { MaterialTopTabBar } from 'react-navigation';
import { color } from 'theme';

function SafeAreaMaterialTopTabBar(props) {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <MaterialTopTabBar
        {...props}
        indicatorStyle={{ backgroundColor: color.oboon }}
        style={{
          backgroundColor: 'white',
          shadowRadius: 3,
          shadowColor: 'rgb(0, 0, 0.7)',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 5 },
          justifyContent: 'center',
        }}
      />
    </SafeAreaView>
  );
}
export default SafeAreaMaterialTopTabBar;
