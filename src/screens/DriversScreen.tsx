import React, {useEffect} from 'react';
import {Text, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState, AppDispatch} from '../redux/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {Driver} from '../types/Driver';
import DriverCard from '../components/DriverCard';
import {fetchDrivers} from '../redux/reducers/driverReducer';

const DriversScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {drivers, loading, error} = useSelector(
    (state: RootState) => state.driver,
  );

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={drivers}
      keyExtractor={(item: Driver) => item.driverId}
      contentContainerStyle={styles.list}
      renderItem={({item}) => <DriverCard driver={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#e10600',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  country: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
});

export default DriversScreen;
