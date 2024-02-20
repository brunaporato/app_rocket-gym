import {
  Center,
  ScrollView,
  VStack,
  Spinner,
  Text,
  Heading,
} from '@gluestack-ui/themed'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserImage } from '@components/UserImage'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function Profile() {
  const [imageIsLoading, setImageIsLoading] = useState(false)

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
              source={{ uri: 'https://github.com/brunaporato.png' }}
              size="$33"
              style={{ position: 'relative' }}
            />
          )}

          <TouchableOpacity>
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
