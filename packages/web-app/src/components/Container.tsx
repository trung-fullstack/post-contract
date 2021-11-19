import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

export function Container({ children, ...rest }: ContainerProps) {
  return (
    <ChakraContainer
      maxW="container.lg"
      {...rest}
    >
      {children}
    </ChakraContainer>
  );
}
