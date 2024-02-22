import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GlueStackInput,
  InputField,
} from '@gluestack-ui/themed'
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native'

interface InputProps {
  placeholder: string
  type: 'text' | 'password'
  errorMessage?: string | null
  kbType?: KeyboardTypeOptions
  bgColor?: string
  value?: string
  isDisabled?: boolean
  onChangeText?: () => void
  onSubmitEditing?: () => void
  returnKeyType?: ReturnKeyTypeOptions
  isInvalid?: boolean
}

export function Input({
  placeholder,
  type,
  kbType,
  value,
  onChangeText,
  onSubmitEditing,
  returnKeyType = 'next',
  errorMessage = null,
  isInvalid,
  ...props
}: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl w="100%" isInvalid={invalid} mb="$4">
      <GlueStackInput
        bgColor="$gray700"
        h="$14"
        px="$2"
        borderWidth={0}
        $focus-borderColor="$green500"
        $focus-borderWidth={1}
        $disabled-bgColor="$gray600"
        $disabled-opacity={1}
        isInvalid={invalid}
        $invalid-borderWidth={1}
        $invalid-borderColor="$red500"
        {...props}
      >
        <InputField
          placeholder={placeholder}
          placeholderTextColor="$gray300"
          $disabled-opacity={0.2}
          fontSize="$md"
          fontFamily="$body"
          color="$white"
          type={type}
          returnKeyType={returnKeyType}
          keyboardType={kbType}
          autoCapitalize={placeholder === 'E-mail' ? 'none' : undefined}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </GlueStackInput>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
