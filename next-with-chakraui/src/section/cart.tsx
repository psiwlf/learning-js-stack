import {
  AspectRatio,
  Button,
  Divider,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import Image from "next/image";

const Cart = () => {
    const {toggleColorMode} = useColorMode();
     const bgColor = useColorModeValue('grey.50', 'whiteAlpha.50');
     const secondaryTextColor = useColorModeValue('grey.600', 'grey.400');
  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
      bg={bgColor}
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Your Cart</Heading>
        <Text>
          If price is too hard on your eyes,
          <Button onClick={toggleColorMode} variant="link" colorScheme="black ">
            try changing the theme.
          </Button>
        </Text>
      </VStack>
      <HStack spacing={6} alignItems="center" w="full">
        <AspectRatio ratio={1} w={24}>
          <Image src={"/text.png"} alt="Image missing why" layout="fill" />
        </AspectRatio>
        <Stack
          spacing={0}
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack w="full" alignItems="left">
            <Heading size="md">Penny Board</Heading>
            <Text color={secondaryTextColor}>PNYCOMP2468</Text>
          </VStack>
          <Heading size="sm" textAlign="end">
            $119.00
          </Heading>
        </Stack>
      </HStack>
      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Subtotal</Text>
          <Heading size="sm">$119.00</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Shipping</Text>
          <Heading size="sm">$19.00</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Taxes(est)</Text>
          <Heading size="sm">$23.00</Heading>
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color={secondaryTextColor}>Total</Text>
        <Heading size="lg">$162.00</Heading>
      </HStack>
    </VStack>
  );
};

export default Cart;
