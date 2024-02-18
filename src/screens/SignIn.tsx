import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed'

import BgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={Platform.OS !== 'ios'}
    >
      <VStack flex={1} pb={Platform.OS === 'ios' ? '$40' : '$16'}>
        <Image
          source={BgImg}
          defaultSource={BgImg}
          alt="People exercizing at gym with low opacity on background"
          resizeMode="cover"
          size="full"
          $base-height="70%"
          $base-width="100%"
          position="absolute"
          top={0}
        />

        <VStack px="$10" mt="$4" pb={Platform.OS === 'ios' ? '$48' : 0}>
          <Center my="$24">
            <LogoSvg />
            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center>
            <Heading
              color="$gray100"
              fontSize="$xl"
              mb="$6"
              fontFamily="$heading"
            >
              Acesse sua conta
            </Heading>

            <Input placeholder="E-mail" type="text" kbType="email-address" />
            <Input placeholder="Senha" type="password" kbType="default" />
            <Button title="Acessar" />
          </Center>
          <Center mt="$24">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Ainda não tem acesso?
            </Text>
            <Button
              title="Criar conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
