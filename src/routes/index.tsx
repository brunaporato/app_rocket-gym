import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { config } from 'config/gluestack-ui.config'

export function Routes() {
  const theme = DefaultTheme
  const { colors } = config.tokens
  theme.colors.background = colors.gray700
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}
