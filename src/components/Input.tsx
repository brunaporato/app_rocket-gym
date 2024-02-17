import { Input as GlueStackInput, InputField } from '@gluestack-ui/themed'
import { KeyboardTypeOptions } from 'react-native'

interface InputProps {
  placeholder: string
  type: 'text' | 'password'
  kbType?: KeyboardTypeOptions
}
export function Input({ placeholder, type, kbType }: InputProps) {
  return (
    <GlueStackInput
      bgColor="$gray700"
      h="$14"
      px="$2"
      borderWidth={0}
      mb="$4"
      $focus-borderColor="$green500"
      $focus-borderWidth={1}
    >
      <InputField
        placeholder={placeholder}
        placeholderTextColor="$gray300"
        fontSize="$md"
        fontFamily="$body"
        color="$white"
        type={type}
        returnKeyType="next"
        keyboardType={kbType}
        autoCapitalize={placeholder === 'E-mail' ? 'none' : undefined}
      />
    </GlueStackInput>
  )
}
