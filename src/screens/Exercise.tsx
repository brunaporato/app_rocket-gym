import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed'
import { Platform, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [submittingRegister, setSubmittingRegister] = useState(false)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()

  const toast = useToast()

  const { exerciseId } = route.params as RouteParamsProps

  function handleReturn() {
    navigation.goBack()
  }

  async function fetchExerciseData() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o exercício. Tente novamente mais tarde.'

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
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSubmittingRegister(true)

      api.post('/history', { exercise_id: exerciseId })

      toast.show({
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id
          return (
            <Toast
              nativeID={toastId}
              action="success"
              mt={Platform.OS === 'android' ? 50 : 0}
              borderWidth={0}
              bgColor="$green700"
              minWidth="80%"
            >
              <VStack space="xs">
                <ToastTitle color="$white" fontFamily="$body">
                  Parabéns!
                </ToastTitle>
                <ToastDescription color="$white" fontFamily="$body">
                  Exercício registrado no seu histórico.
                </ToastDescription>
              </VStack>
            </Toast>
          )
        },
      })

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar o exercício. Tente novamente mais tarde.'

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
    } finally {
      setSubmittingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId])

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
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p="$8">
            <Box rounded="$lg" mb="$3" overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                w="$full"
                h="$80"
                alt={exercise.name}
                resizeMode="cover"
              />
            </Box>

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
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="$gray200" ml="$2">
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                isLoading={submittingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
