import React from "react";
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Text,
  Progress,
  Icon,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaCogs,
  FaDatabase,
} from "react-icons/fa";

const MotionBox = motion(Box);

const Skills = ({ primaryColor = "blue" }) => {
  const { colorMode } = useColorMode();

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: FaReact,
      color: "cyan",
      skills: [
        { name: "ReactJS", level: 90 },
        { name: "JavaScript / TypeScript", level: 85 },
        { name: "HTML / CSS", level: 95 },
        { name: "Chakra UI / Tailwind", level: 80 },
      ],
    },
    {
      title: "Backend Development",
      icon: FaNodeJs,
      color: "green",
      skills: [
        { name: "Node.js / Express.js", level: 85 },
        { name: "Java (Spring Boot)", level: 80 },
        { name: "Python (FastAPI / Flask)", level: 75 },
        { name: "REST API Design", level: 90 },
      ],
    },
    {
      title: "Automation & Testing",
      icon: FaCogs,
      color: "orange",
      skills: [
        { name: "Selenium Java", level: 90 },
        { name: "Automation Frameworks", level: 85 },
        { name: "API Testing (Postman)", level: 80 },
        { name: "CI Integration (Jenkins/GitHub)", level: 75 },
      ],
    },
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
              My Skills
            </Text>
            <Text
              color={`${primaryColor}.500`}
              fontSize="lg"
              fontWeight="medium"
            >
              Expertise in ReactJS, Backend, and Automation
            </Text>
          </MotionBox>

          {/* Skills Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
            {skillCategories.map((category, i) => (
              <MotionBox
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                bg={colorMode === "light" ? "white" : "gray.800"}
                p={6}
                borderRadius="xl"
                boxShadow="lg"
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              >
                <VStack spacing={6} align="start">
                  {/* Category Header */}
                  <HStack spacing={3}>
                    <Icon as={category.icon} color={`${category.color}.500`} boxSize={6} />
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color={colorMode === "light" ? "gray.800" : "white"}
                    >
                      {category.title}
                    </Text>
                  </HStack>

                  {/* Skill Bars */}
                  <VStack spacing={4} w="100%">
                    {category.skills.map((skill) => (
                      <Box key={skill.name} w="100%">
                        <HStack justify="space-between" mb={2}>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color={colorMode === "light" ? "gray.700" : "gray.300"}
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
                        <Progress
                          value={skill.level}
                          colorScheme={primaryColor}
                          size="sm"
                          borderRadius="full"
                          bg={colorMode === "light" ? "gray.200" : "gray.600"}
                        />
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            textAlign="center"
            maxW="600px"
          >
            <Text
              color={colorMode === "light" ? "gray.600" : "gray.400"}
              fontSize="lg"
              lineHeight="taller"
            >
              I focus on building high-performance ReactJS applications, robust backend APIs,
              and reliable automation frameworks — ensuring smooth, scalable, and maintainable software solutions.
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Skills;
