/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { Loading } from '@components/Loading'
import { config } from 'config/gluestack-ui.config'
import { Routes } from './src/routes'
import { AuthContext } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider
        value={{
          id: '1',
          name: 'Bruna',
          email: 'brunaporato@email.com',
          avatar: 'bruna.png',
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </GluestackUIProvider>
  )
}
