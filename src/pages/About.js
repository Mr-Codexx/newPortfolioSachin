import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  SimpleGrid,
  useColorMode,
  Icon,
  Progress,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaAward, FaUser, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const MotionBox = motion(Box);

const About = ({ primaryColor = "blue" }) => {
  const { colorMode } = useColorMode();

  const personalInfo = [
    { icon: FaUser, label: "Name", value: "Sachin Sharma" },
    { icon: FaEnvelope, label: "Email", value: "MrSachinSharma.dev@gmail.com" },
    { icon: FaMapMarkerAlt, label: "Location", value: "India" },
    { icon: FaAward, label: "Experience", value: "3+ Years" },
  ];

  const skills = [
    { name: "Selenium Java", level: 92 },
    { name: "Automation Framework Design", level: 88 },
    { name: "ReactJS + Chakra UI", level: 85 },
    { name: "Backend Integration (Node/Firebase)", level: 80 },
    { name: "Test Reporting (Extent / ExcelScript)", level: 78 },
  ];

  return (
    <Box bg={colorMode === "light" ? "white" : "gray.900"} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="center">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              mb={4}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              About Me
            </Text>
            <Text color={`${primaryColor}.500`} fontSize="lg" fontWeight="medium">
              Get to know me better
            </Text>
          </MotionBox>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            w="100%"
            align="center"
          >
            {/* Image Section */}
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              textAlign="center"
            >
              <Box
                position="relative"
                maxW="400px"
                mx="auto"
                borderRadius="2xl"
                overflow="hidden"
              
              >
                <Image
                  src="./img.png"
                  alt="Sachin Sharma"
                  objectFit="cover"
                  w="100%"
                  h="500px"
                />
                <Box
                  position="absolute"
                  top={4}
                  right={4}
                  bg={`${primaryColor}.500`}
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  Available for work
                </Box>
              </Box>
            </MotionBox>

            {/* Content Section */}
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <VStack spacing={6} align="start">
                {/* Short Description */}
                <Text
                  fontSize="lg"
                  color={colorMode === "light" ? "gray.600" : "gray.400"}
                  lineHeight="taller"
                >
                  I’m <b>Sachin Sharma</b>, an <b>Automation Developer</b> with a
                  strong focus on <b>ReactJS, Backend Integration,</b> and{" "}
                  <b>Selenium-based Automation</b>. I love creating reliable,
                  clean, and scalable solutions that make projects run smoother
                  and smarter.
                </Text>

                {/* Personal Info */}
                <SimpleGrid columns={2} spacing={4} w="100%">
                  {personalInfo.map((info, index) => (
                    <HStack key={index} spacing={3}>
                      <Icon
                        as={info.icon}
                        color={`${primaryColor}.500`}
                        boxSize={4}
                      />
                      <VStack align="start" spacing={0}>
                        <Text
                          fontSize="sm"
                          color={
                            colorMode === "light" ? "gray.500" : "gray.400"
                          }
                        >
                          {info.label}
                        </Text>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color={
                            colorMode === "light" ? "gray.800" : "white"
                          }
                        >
                          {info.value}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </SimpleGrid>

                {/* Skills */}
                <Box w="100%" mt={4}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    mb={4}
                    color={colorMode === "light" ? "gray.800" : "white"}
                  >
                    Skills
                  </Text>

                  <VStack spacing={3} align="start" w="100%">
                    {skills.map((skill, index) => (
                      <Box key={index} w="100%">
                        <HStack justify="space-between">
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={
                              colorMode === "light"
                                ? "gray.700"
                                : "gray.300"
                            }
                          >
                            {skill.name}
                          </Text>
                          <Text
                            fontSize="sm"
                            color={`${primaryColor}.500`}
                            fontWeight="bold"
                          >
                            {skill.level}%
                          </Text>
                        </HStack>
                        <Box
                          w="100%"
                          h="6px"
                          borderRadius="full"
                          bg={colorMode === "light" ? "gray.200" : "gray.700"}
                          overflow="hidden"
                        >
                          <MotionBox
                            h="100%"
                            bg={`${primaryColor}.500`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;
