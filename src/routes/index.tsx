import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { config } from 'config/gluestack-ui.config'
import { AppRoutes } from './app.routes'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

export function Routes() {
  const theme = DefaultTheme
  const { colors } = config.tokens

  const contextData = useContext(AuthContext)

  theme.colors.background = colors.gray700
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}
