import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getFlagUrlByNationality} from '../utils/getFlagUrlByNationality';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {fetchDriverResults} from '../redux/reducers/driverResultsReducer';

type Driver = {
  driverId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  url: string;
};

type RootStackParamList = {
  DriverDetails: {driver: Driver};
};

type DriverDetailRouteProp = RouteProp<RootStackParamList, 'DriverDetails'>;

const DetailsScreen = () => {
  const route = useRoute<DriverDetailRouteProp>();
  const {driver} = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const {races, loading} = useSelector(
    (state: RootState) => state.driverResults,
  );

  useEffect(() => {
    dispatch(fetchDriverResults(driver.driverId));
  }, [driver.driverId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}} // Заглушка, можно заменить
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {driver.givenName} {driver.familyName}
        </Text>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.value}>{driver.dateOfBirth}</Text>
        <Text style={styles.label}>Nationality:</Text>
        <View style={styles.nationalityRow}>
          {getFlagUrlByNationality(driver.nationality) && (
            <Image
              source={{uri: getFlagUrlByNationality(driver.nationality)!}}
              style={styles.flag}
            />
          )}
          <Text style={styles.value}>{driver.nationality}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(driver.url)}>
          <Text style={styles.buttonText}>Open F1 Profile</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        races.map((race: any) => (
          <View key={race.round} style={styles.raceCard}>
            <Text style={styles.raceName}>{race.raceName}</Text>
            <Text style={styles.circuitName}>{race.Circuit.circuitName}</Text>
            <Text style={styles.raceDate}>{race.date}</Text>
            <Text style={styles.raceLocation}>
              Position: {race.Results[0]?.position || 'N/A'}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    flexGrow: 1,
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#e10600',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e10600',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
  nationalityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    marginRight: 6,
  },
  button: {
    backgroundColor: '#e10600',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  raceCard: {
    width: '100%',
    backgroundColor: '#0d0d0d',
    borderLeftWidth: 5,
    borderLeftColor: '#e10600',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
  },
  raceName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  raceDate: {
    color: '#ccc',
    marginTop: 6,
    fontSize: 14,
  },
  raceLocation: {
    color: '#aaa',
    marginTop: 4,
    fontSize: 12,
    fontStyle: 'italic',
  },
  circuitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e10600', // тот же красный, как в border
    marginTop: 8,
  },
});

export default DetailsScreen;
