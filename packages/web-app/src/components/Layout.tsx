import { Flex, ContainerProps } from '@chakra-ui/react'
import { Container } from './Container'
import { Navbar } from './Navbar'

export function Layout(props: ContainerProps) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Container as="main" display="flex" flexDirection="column" {...props} />
    </Flex>
  )
}
