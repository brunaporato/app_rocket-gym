import { ExerciseCard } from '@components/ExerciseCard'
import { Filter } from '@components/Filter'
import { HomeHeader } from '@components/HomeHeader'
import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { FlatList } from 'react-native'

export function Home() {
  const filters = ['costas', 'ombro', 'biceps', 'triceps']
  const [filterSelected, setFilterSelected] = useState<string>(filters[0])
  const exercises = [
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
    'Remada reta',
    'Levantamento lateral',
  ]

  return (
    <VStack flex={1}>
      <HomeHeader />
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
        style={{ marginVertical: 40, maxHeight: 40 }}
      />

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
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard title={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </VStack>
    </VStack>
  )
}
