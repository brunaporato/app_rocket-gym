import { VStack, Heading, Text, HStack, Icon } from '@gluestack-ui/themed'
import { MaterialIcons } from '@expo/vector-icons'

import { UserImage } from './UserImage'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '@hooks/useAuth'

import defaultUserPhoto from '@assets/userPhotoDefault.png'
import { api } from '@services/api'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack bgColor="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserImage
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhoto
        }
        size={64}
        mr={16}
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$md" mb={0}>
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md" lineHeight={18}>
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} color="$gray200" size="xl" name="logout" />
      </TouchableOpacity>
    </HStack>
  )
}
