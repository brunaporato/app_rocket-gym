import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import {
  Center,
  ScrollView,
  VStack,
  Spinner,
  Text,
  Heading,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@gluestack-ui/themed'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { FileInfo } from 'expo-file-system'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserImage } from '@components/UserImage'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '@hooks/useAuth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

type FormDataProps = {
  name: string
  email: string
  old_password: string
  password: string
  confirm_password: string
}

const profileSchema = yup.object<FormDataProps>({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => value || null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => value || null),
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [userImage, setUserImage] = useState(
    'https://github.com/brunaporato.png',
  )
  const [imageIsLoading, setImageIsLoading] = useState(false)
  const { user, updateUserProfile } = useAuth()

  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any>(profileSchema),
  })

  async function handleSelectUserImage() {
    setImageIsLoading(true)
    try {
      const selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      })

      if (selectedImage.canceled) return

      if (selectedImage.assets[0].uri) {
        const imageInfo = (await FileSystem.getInfoAsync(
          selectedImage.assets[0].uri,
        )) as FileInfo

        if (imageInfo.size && imageInfo.size / (1024 * 1024) > 8) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => {
              const toastId = 'toast-' + id
              return (
                <Toast
                  nativeID={toastId}
                  action="attention"
                  mt={100}
                  variant="outline"
                  borderWidth={0}
                  bgColor="$red500"
                >
                  <VStack space="xs">
                    <ToastTitle color="$white" fontFamily="$heading">
                      Tamanho não suportado
                    </ToastTitle>
                    <ToastDescription color="$white" fontFamily="$body">
                      Você excedeu o tamanho suportado, escolha uma imagem de
                      até 8MB.
                    </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        }

        setUserImage(selectedImage.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setImageIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id
          return (
            <Toast
              nativeID={toastId}
              action="success"
              variant="outline"
              borderWidth={0}
              bgColor="$green700"
              mt={Platform.OS === 'android' ? 50 : 0}
            >
              <VStack space="xs">
                <ToastTitle color="$white" fontFamily="$heading">
                  Perfil atualizado com sucesso!
                </ToastTitle>
              </VStack>
            </Toast>
          )
        },
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id
          return (
            <Toast
              nativeID={toastId}
              action="error"
              mt={100}
              variant="outline"
              borderWidth={0}
              bgColor="$red500"
            >
              <VStack space="xs">
                <ToastTitle color="$white" fontFamily="$heading">
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
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Center mt="$6" px="$10">
          {imageIsLoading ? (
            <Center
              borderWidth={2}
              borderColor="$gray400"
              h="$33"
              w="$33"
              rounded="$full"
            >
              <Spinner position="absolute" size="large" color="$gray400" />
            </Center>
          ) : (
            <UserImage
              source={{ uri: userImage }}
              size="$33"
              style={{ position: 'relative' }}
            />
          )}

          <TouchableOpacity onPress={handleSelectUserImage}>
            <Text
              color="$green500"
              fontWeight="bold"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bgColor="$gray600"
                type={'text'}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                type={'text'}
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading
            color="$gray200"
            fontSize="$md"
            mb="$2"
            mt="$12"
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bgColor="$gray600"
                placeholder="Senha antiga"
                type="password"
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bgColor="$gray600"
                placeholder="Nova senha"
                type="password"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bgColor="$gray600"
                placeholder="Confirme a nova senha"
                type="password"
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt="$4"
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
