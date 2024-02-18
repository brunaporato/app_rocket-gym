import { Box } from '@gluestack-ui/themed'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Box flex={1} bgColor="$gray700">
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUp" component={SignUp} />
      </Navigator>
    </Box>
  )
}
