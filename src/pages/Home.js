import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const Home = () => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const highlightColor = useColorModeValue('brand.600', 'brand.300');

  return (
    <>
      <Helmet>
        <title>Home | Advanced Portfolio</title>
        <meta name="description" content="Creative Full Stack Developer and UI/UX Designer" />
      </Helmet>

      <Container maxW="container.xl" py={8}>
        <Flex
          minH="80vh"
          align="center"
          justify="space-between"
          direction={{ base: 'column', lg: 'row' }}
          gap={8}
        >
          <MotionVStack
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            align={{ base: 'center', lg: 'flex-start' }}
            spacing={6}
            flex={1}
          >
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color={highlightColor}
              fontWeight="semibold"
            >
              Hello, I'm
            </Text>
            
            <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={2}>
              <Text
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="bold"
                lineHeight="1.1"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                John Doe
              </Text>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                color={textColor}
                fontWeight="medium"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Full Stack Developer & 
                <Text as="span" color={highlightColor}> UI/UX Designer</Text>
              </Text>
            </VStack>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={textColor}
              maxW="500px"
              textAlign={{ base: 'center', lg: 'left' }}
              lineHeight="1.6"
            >
              I create digital experiences that are fast, accessible, visually appealing, 
              and responsive. Let's build something amazing together.
            </Text>

            <HStack spacing={4} pt={4}>
              <Button
                size="lg"
                colorScheme="brand"
                rightIcon={<FiDownload />}
              >
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
              >
                View Projects
              </Button>
            </HStack>

            <HStack spacing={4} pt={8}>
              {[FiGithub, FiLinkedin, FiTwitter].map((SocialIcon, index) => (
                <MotionBox
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    as={SocialIcon}
                    boxSize={6}
                    color={textColor}
                    _hover={{ color: highlightColor }}
                    cursor="pointer"
                  />
                </MotionBox>
              ))}
            </HStack>
          </MotionVStack>

          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            flex={1}
            display="flex"
            justify="center"
          >
            <Box
              w="400px"
              h="400px"
              borderRadius="full"
              bgGradient="linear(45deg, brand.500, purple.500)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                inset: '-10px',
                borderRadius: 'full',
                bgGradient: 'linear(45deg, brand.500, purple.500)',
                filter: 'blur(20px)',
                opacity: 0.5,
                zIndex: -1,
              }}
            >
              <Box
                w="380px"
                h="380px"
                borderRadius="full"
                bg="gray.800"
                backgroundImage="url('https://i.pinimg.com/564x/3c/fa/12/3cfa1280ad3858b935aad427b2b47aa4.jpg')"
                // backgroundSize: "cover"
                // backgroundPosition: "center"
                border="4px solid"
                borderColor="gray.700"
              />
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </>
  );
};

export default Home;