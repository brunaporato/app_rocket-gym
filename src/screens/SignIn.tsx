import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@gluestack-ui/themed'

import BgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { useState } from 'react'

interface SignInFormDataProps {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Informe seu email')
    .email('Informe um email válido'),
  password: yup.string().required('Informe sua senha'),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormDataProps>({ resolver: yupResolver(signInSchema) })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { signIn } = useAuth()
  const toast = useToast()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: SignInFormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível logar. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id
          return (
            <Toast
              nativeID={toastId}
              action="error"
              mt={Platform.OS === 'android' ? 50 : 0}
              borderWidth={0}
              bgColor="$red500"
              minWidth="80%"
            >
              <VStack space="xs">
                <ToastTitle color="$white" fontFamily="$body">
                  Erro
                </ToastTitle>
                <ToastDescription color="$white" fontFamily="$body">
                  {title}
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })
      setIsLoading(false)
    }
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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  type="text"
                  kbType="email-address"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  type="password"
                  kbType="default"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
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
