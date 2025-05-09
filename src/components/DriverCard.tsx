import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Driver = {
  driverId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  url: string;
};

type Props = {
  driver: Driver;
};

const DriverCard = ({driver}: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', {driver})}>
      <Text style={styles.name}>
        {driver.givenName} {driver.familyName}
      </Text>
      <Text style={styles.info}>Nationality: {driver.nationality}</Text>
      <Text style={styles.info}>Date of Birth: {driver.dateOfBirth}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});

export default DriverCard;
