import {
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Icon,
} from '@gluestack-ui/themed'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

interface ExerciseCardProps extends TouchableOpacityProps {
  title: string
}

export function ExerciseCard({ title, ...props }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...props}>
      <HStack
        bgColor="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: 'https://www.origym.com.br/midia/remada-unilateral-3.jpg',
          }}
          alt="Exercise's example image"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white">
            {title}
          </Heading>
          <Text fontSize="$sm" color="$gray200" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
