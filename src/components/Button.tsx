import { ButtonText, Button as GlueStackButton } from '@gluestack-ui/themed'

interface ButtonProps {
  title?: string
  variant?: 'solid' | 'outline'
  mt?: '$20'
}

export function Button({ title, variant, mt }: ButtonProps) {
  return (
    <GlueStackButton
      w="$full"
      h="$14"
      bgColor={variant === 'outline' ? 'transparent' : '$green700'}
      rounded="$sm"
      $active-bg={variant === 'outline' ? '$gray500' : '$green500'}
      variant={variant}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="$green500"
      mt={mt}
    >
      <ButtonText
        color={variant === 'outline' ? '$green500' : '$white'}
        fontFamily="$heading"
        fontSize="$sm"
      >
        {title}
      </ButtonText>
    </GlueStackButton>
  )
}
