import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
  const [exercises, setExercises] = useState([
    { title: '26.08.24', data: ['Puxada frontal', 'remada unilateral'] },
    { title: '27.08.24', data: ['Puxada lateral'] },
  ])
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$8" mb="$3">
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'} Vamos treinar hoje?
          </Text>
        )}
        style={{ paddingHorizontal: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}
