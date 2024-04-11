import { HistoryDTO } from '@dtos/HistoryDTO'
import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'

type HistoryCardProps = {
  data: HistoryDTO
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      mb="$3"
      bgColor="$gray600"
      rounded="$md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr="$5" flex={1}>
        <Heading
          color="$white"
          fontSize="$md"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {data.group}
        </Heading>
        <Text color="$gray100" fontSize="$lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$md">
        {data.hour}
      </Text>
    </HStack>
  )
}
