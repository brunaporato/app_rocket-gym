/* eslint-disable react-hooks/exhaustive-deps */
import { ExerciseCard } from '@components/ExerciseCard'
import { Filter } from '@components/Filter'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import {
  HStack,
  Heading,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Platform } from 'react-native'

export function Home() {
  const [filters, setFilters] = useState<string[]>([])
  const [filterSelected, setFilterSelected] = useState<string>('antebraço')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchFilters() {
    try {
      const response = await api.get('/groups')
      setFilters(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os filtros de músculos'

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
    }
  }

  async function fetchExercisesByFilter() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${filterSelected}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios. Tente novamente mais tarde.'

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

  useEffect(() => {
    fetchFilters()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByFilter()
    }, [filterSelected]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
      {filters && (
        <FlatList
          data={filters}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              name={item}
              isActive={filterSelected.toUpperCase() === item.toUpperCase()}
              onPress={() => setFilterSelected(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 32,
          }}
          style={{ marginVertical: 40, maxHeight: 40, minHeight: 40 }}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px="$8">
          <HStack justifyContent="space-between" mb="$5" alignItems="center">
            <Heading color="$gray200" fontSize="$md">
              Exercícios
            </Heading>
            <Text color="$gray200" fontSize="$sm">
              {exercises.length}
            </Text>
          </HStack>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
