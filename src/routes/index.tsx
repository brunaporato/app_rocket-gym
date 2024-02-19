import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { config } from 'config/gluestack-ui.config'
import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme
  const { colors } = config.tokens
  theme.colors.background = colors.gray700
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
