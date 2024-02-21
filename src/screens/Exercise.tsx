import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleReturn() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bgColor="$gray600" pt="$14">
        <TouchableOpacity onPress={handleReturn}>
          <Icon as={Feather} color="$green500" name="arrow-left" size="xl" />
        </TouchableOpacity>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt="$4"
          mb="$8"
        >
          <Heading color="$gray100" fontSize="$lg" flexShrink={1}>
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p="$8">
        <Image
          source={{
            uri: 'https://www.origym.com.br/midia/remada-unilateral-3.jpg',
          }}
          w="$full"
          h="$80"
          alt="Nome do exercicio"
          mb="$3"
          resizeMode="cover"
          rounded="$lg"
        />

        <Box bgColor="$gray600" rounded="$md" pb="$4" px="$4">
          <HStack
            alignItems="center"
            justifyContent="space-around"
            mb="$6"
            mt="$5"
          >
            <HStack>
              <SeriesSvg />
              <Text color="$gray200" ml="$2">
                3 séries
              </Text>
            </HStack>
            <HStack>
              <RepetitionsSvg />
              <Text color="$gray200" ml="$2">
                12 repetições
              </Text>
            </HStack>
          </HStack>
          <Button title="Marcar como realizado" />
        </Box>
      </VStack>
    </VStack>
  )
}
