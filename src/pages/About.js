// pages/About.js
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  SimpleGrid,
  Progress,
  Icon,
  useColorMode,
  Badge,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaAward, FaUsers, FaRocket, FaHeart } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const About = ({ primaryColor = "teal", colorMode }) => {
  const skills = [
    { name: "UI/UX Design", level: 95, color: "green" },
    { name: "Brand Strategy", level: 88, color: "blue" },
    { name: "Web Design", level: 92, color: "purple" },
    { name: "Mobile Design", level: 85, color: "pink" },
    { name: "User Research", level: 90, color: "orange" },
    { name: "Visual Design", level: 94, color: "cyan" },
  ];

  const stats = [
    { icon: FaAward, number: "15+", label: "Awards Won", color: "yellow" },
    { icon: FaUsers, number: "45+", label: "Happy Clients", color: "blue" },
    { icon: FaRocket, number: "120+", label: "Projects Done", color: "green" },
    { icon: FaHeart, number: "98%", label: "Client Satisfaction", color: "red" },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <MotionVStack
        spacing={12}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <VStack spacing={6} textAlign="center" maxW="800px">
          <Badge colorScheme={primaryColor} px={4} py={2} borderRadius="full" fontSize="lg">
            About Me
          </Badge>
          <Heading
            size="2xl"
            bgGradient={`linear(45deg, ${primaryColor}.500, blue.500)`}
            bgClip="text"
          >
            Creative Designer & Brand Strategist
          </Heading>
          <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            With over 5 years of experience in creating stunning digital experiences 
            that drive results and captivate audiences.
          </Text>
        </VStack>

        {/* Profile Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center" w="100%">
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Lena working"
              borderRadius="2xl"
              boxShadow="2xl"
            />
          </MotionBox>

          <MotionVStack
            spacing={6}
            align="start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Heading size="xl">Hello, I'm Lena</Heading>
            <Text fontSize="lg" color={colorMode === "light" ? "gray.600" : "gray.300"}>
              I'm a passionate visual designer and brand strategist dedicated to creating 
              meaningful digital experiences. My approach combines creative thinking with 
              strategic planning to deliver solutions that not only look beautiful but 
              also drive business results.
            </Text>
            
            <Text fontSize="lg" color={colorMode === "light" ? "gray.600" : "gray.300"}>
              I believe in the power of design to transform businesses and create 
              emotional connections with users. Every project is an opportunity to 
              innovate and push creative boundaries.
            </Text>

            {/* Stats Grid */}
            <SimpleGrid columns={2} spacing={6} w="100%" pt={4}>
              {stats.map((stat, index) => (
                <MotionBox
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card bg={colorMode === "light" ? "white" : "gray.800"} boxShadow="lg">
                    <CardBody textAlign="center">
                      <Icon as={stat.icon} color={`${stat.color}.500`} boxSize={8} mb={2} />
                      <Text fontSize="2xl" fontWeight="bold">{stat.number}</Text>
                      <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>
                        {stat.label}
                      </Text>
                    </CardBody>
                  </Card>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionVStack>
        </SimpleGrid>

        {/* Skills Section */}
        <VStack spacing={8} w="100%">
          <Heading size="xl" textAlign="center">My Skills</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
            {skills.map((skill, index) => (
              <MotionBox
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" w="100%">
                    <Text fontWeight="semibold">{skill.name}</Text>
                    <Text color={`${primaryColor}.500`} fontWeight="bold">
                      {skill.level}%
                    </Text>
                  </HStack>
                  <Progress
                    value={skill.level}
                    colorScheme={skill.color}
                    size="lg"
                    borderRadius="full"
                    w="100%"
                    bg={colorMode === "light" ? "gray.200" : "gray.700"}
                  />
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </MotionVStack>
    </Container>
  );
};

export default About;