import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { config } from 'config/gluestack-ui.config'
import { AppRoutes } from './app.routes'
import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { colors } = config.tokens

  const { user } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = colors.gray700
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}
