import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriversScreen from '../screens/DriversScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {iDriver} from '../types/Driver';

export type RootStackParamList = {
  Schedule: undefined;
  Drivers: undefined;
  DriverDetails: {driver: iDriver};
};

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Drivers">
      <Stack.Screen name="Drivers" component={DriversScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: 'Driver Details'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
