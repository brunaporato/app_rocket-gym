import { Pressable, Text } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'

interface FilterProps extends PressableProps {
  name: string
  isActive: boolean
}

export function Filter({ name, isActive, ...props }: FilterProps) {
  return (
    <Pressable
      mr="$3"
      w="$24"
      h="$10"
      bgColor="$gray600"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      $active-borderWidth={2}
      $active-borderColor="$green500"
      borderWidth={isActive ? 2 : 0}
      borderColor="$green500"
      {...props}
    >
      <Text
        color={isActive ? '$green500' : '$gray200'}
        textTransform="uppercase"
        fontSize="$xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  )
}
