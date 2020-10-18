import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Updates from 'expo-updates';
import * as Sentry from 'sentry-expo';
import api from './service/api';

const Main = () => {
  useEffect(() => {
    async function getUpdates() {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      }
    }
    if (!__DEV__) {
      getUpdates();
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }
      await Location.startLocationUpdatesAsync('UPDATE_LOCATION', {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 5,
        foregroundService: {
          notificationTitle: 'Pegando Localização em background',
          notificationBody: 'Enviando localização para API',
          notificationColor: '#FF7406',
        },
        showsBackgroundLocationIndicator: true,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        Task Criada
      </Text>
    </View>
  );
};

TaskManager.defineTask('UPDATE_LOCATION', ({ data: { locations }, error }) => {
  if (error) {
    Sentry.Native.captureEvent(`erro ${JSON.stringify(error)}`);
    return;
  }
  if (locations) {
    const { longitude, latitude } = locations[0].coords;
    const sendLocation = async () => {
      try {
        await api.post('locations', {
          longitude: String(longitude),
          latitude: String(latitude),
        });
        Alert.alert('location sended');
      } catch (errorSend) {
        Alert.alert(JSON.stringify(errorSend));
        Sentry.Native.captureException(errorSend);
      }
    };

    sendLocation();
  }
});

export default Main;
