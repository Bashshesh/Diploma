import { SplashScreen, Stack } from 'expo-router';
import './globals.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import GlobalProvider from '@/lib/global-provider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Можно заменить на индикатор загрузки, например, <ActivityIndicator />
  }

  return (
      <I18nextProvider i18n={i18n}>
        <GlobalProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </GlobalProvider>
      </I18nextProvider>
  );
}