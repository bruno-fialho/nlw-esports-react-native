import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';

import { Routes } from './src/routes';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';



export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);
  // ExponentPushToken[hf_SuIE1TI_genEE-gXZSV]
  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification', notification);
    });

    responseNotificationListener.current = Notifications.addNotificationReceivedListener(response => {
      console.log('response', response);
    });

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  }, []);

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
