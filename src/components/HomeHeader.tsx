import { VStack, Heading, Text, HStack, Icon } from '@gluestack-ui/themed'
import { MaterialIcons } from '@expo/vector-icons'

import { UserImage } from './UserImage'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bgColor="$gray600" pt="$16" pb="$5" px="$8" alignItems="center">
      <UserImage
        source={{ uri: 'https://github.com/brunaporato.png' }}
        size={64}
        mr={16}
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$md" mb={0}>
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md" lineHeight={18}>
          Bruna
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} color="$gray200" size="xl" name="logout" />
      </TouchableOpacity>
    </HStack>
  )
}
