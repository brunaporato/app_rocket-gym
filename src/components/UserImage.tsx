import { Image } from '@gluestack-ui/themed'
import { ImageProps } from 'react-native'

type UserImageProps = ImageProps & {
  size: number | string
  mr?: number
}

export function UserImage({ size, mr, ...props }: UserImageProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="$full"
      borderWidth={2}
      borderColor="$gray400"
      alt="User's image"
      mr={mr}
      {...props}
    />
  )
}
