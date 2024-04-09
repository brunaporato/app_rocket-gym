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
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'

interface ExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...props }: ExerciseCardProps) {
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
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
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
            {data.name}
          </Heading>
          <Text fontSize="$sm" color="$gray200" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
