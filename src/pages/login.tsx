import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/catalog");
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.500, purple.600, pink.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <MotionBox
        bg="whiteAlpha.200"
        backdropFilter="blur(15px)"
        border="1px solid"
        borderColor="whiteAlpha.300"
        borderRadius="2xl"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
        p={8}
        maxW="md"
        w="full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Flex justifyContent={'center'}>
              <MotionImage
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="Run Free Logo"
                boxSize="50px"
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            </Flex>
            <HStack justify="center" spacing={3}>
              <Heading
                size="xl"
                color="white"
                fontFamily="heading"
                letterSpacing="wide"
                fontWeight="extrabold"
                fontSize="35"
                bgGradient="linear(to-r, teal.300, blue.400, purple.400)"
                bgClip="text"
              >
                Run Free
              </Heading>
            </HStack>
            <Text color="whiteAlpha.800" fontSize="sm" mt={2}>
              Welcome back — sign in to see your orders
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel color="whiteAlpha.900">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="whiteAlpha.100"
                  borderColor="whiteAlpha.300"
                  _hover={{ borderColor: "whiteAlpha.500" }}
                  _focus={{ borderColor: "whiteAlpha.700", bg: "whiteAlpha.200" }}
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="whiteAlpha.900">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="whiteAlpha.100"
                    borderColor="whiteAlpha.300"
                    _hover={{ borderColor: "whiteAlpha.500" }}
                    _focus={{ borderColor: "whiteAlpha.700", bg: "whiteAlpha.200" }}
                    color="white"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Toggle password visibility"
                      variant="ghost"
                      color="whiteAlpha.800"
                      _hover={{ color: "white" }}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="pink"
                w="full"
                size="lg"
                fontWeight="bold"
                _hover={{
                  bgGradient: "linear(to-r, pink.400, purple.500)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                }}
                transition="all 0.3s"
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </MotionBox>
    </Box>
  );
};
