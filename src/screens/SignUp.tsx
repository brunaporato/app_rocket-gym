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

export function SignUp() {
  const navigation = useNavigation()

  function handleReturnScreen() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pb="$8">
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

        <VStack px="$10" mt="$4" pb={Platform.OS === 'ios' ? '$40' : 0}>
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
              Crie sua conta
            </Heading>

            <Input placeholder="Nome" type="text" />
            <Input placeholder="E-mail" type="text" kbType="email-address" />
            <Input placeholder="Senha" type="password" kbType="default" />
            <Input
              placeholder="Confirme sua senha"
              type="password"
              kbType="default"
            />
            <Button title="Acessar" />
          </Center>
          <Center mt="$16">
            <Button
              title="Voltar para o login"
              variant="outline"
              onPress={handleReturnScreen}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
