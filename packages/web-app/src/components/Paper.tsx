import { Stack, StackProps } from '@chakra-ui/react'

export function Paper({ children, ...rest }: StackProps) {
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" {...rest}>
      {children}
    </Stack>
  )
}
