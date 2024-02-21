import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
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

export function Profile() {
  const [userImage, setUserImage] = useState(
    'https://github.com/brunaporato.png',
  )
  const [imageIsLoading, setImageIsLoading] = useState(false)

  const toast = useToast()

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

          <Input placeholder="Nome" bgColor="$gray600" type={'text'} />
          <Input
            placeholder="E-mail"
            type={'text'}
            value="brunaporato@gmail.com"
            isDisabled
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
          <Input
            bgColor="$gray600"
            placeholder="Senha antiga"
            type="password"
          />
          <Input bgColor="$gray600" placeholder="Nova senha" type="password" />
          <Input
            bgColor="$gray600"
            placeholder="Confirme a nova senha"
            type="password"
          />
          <Button title="Atualizar" mt="$4" />
        </Center>
      </ScrollView>
    </VStack>
  )
}
