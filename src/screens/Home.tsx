import { Filter } from '@components/Filter'
import { HomeHeader } from '@components/HomeHeader'
import { VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { FlatList } from 'react-native'

export function Home() {
  const [filterSelected, setFilterSelected] = useState<string>('ombro')
  const [filters, setFilters] = useState<string[]>([
    'costas',
    'ombro',
    'biceps',
    'triceps',
  ])

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={filters}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Filter
            name={item}
            isActive={filterSelected === item}
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
    </VStack>
  )
}
