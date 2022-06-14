import { Container, Flex, VStack } from "@chakra-ui/react";
import Cart from "../src/section/cart";
import Details from "../src/section/details";

const IndexPage = () => (
  <Container maxW="container.xl" p={0}>
    {/* below  is 1/3 syntax for responsiveness i.e. array syntax used with py and 2/3 is object synatx used with h and direction */}
    <Flex
      h={{base: 'auto', md: '100vh'}}
      py={[0, 10, 20]}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Details />
      <Cart />
    </Flex>
  </Container>
);

export default IndexPage;
