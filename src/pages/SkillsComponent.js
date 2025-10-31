// pages/Skills.js
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Progress,
  Icon,
  useColorMode,
  Badge,
  Card,
  CardBody,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaFigma,
  FaSketch,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiAdobexd,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiNextdotjs,
  SiTypescript,
  SiAdobe,
} from "react-icons/si";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionVStack = motion(Box);

const Skills = ({ primaryColor = "teal", colorMode }) => {
  const skillCategories = [
    {
      title: "Design Tools",
      skills: [
        { name: "Figma", icon: FaFigma, level: 95, color: "purple" },
        { name: "Sketch", icon: FaSketch, level: 88, color: "orange" },
        { name: "Adobe XD", icon: SiAdobexd, level: 90, color: "pink" },
        { name: "Photoshop", icon: SiAdobephotoshop, level: 85, color: "blue" },
        { name: "Illustrator", icon: SiAdobeillustrator, level: 82, color: "yellow" },
      ]
    },
    {
      title: "Development",
      skills: [
        { name: "React", icon: FaReact, level: 88, color: "cyan" },
        { name: "Next.js", icon: SiNextdotjs, level: 85, color: "gray" },
        { name: "JavaScript", icon: FaJs, level: 92, color: "yellow" },
        { name: "TypeScript", icon: SiTypescript, level: 80, color: "blue" },
        { name: "HTML5", icon: FaHtml5, level: 95, color: "orange" },
        { name: "CSS3", icon: FaCss3Alt, level: 93, color: "blue" },
      ]
    },
    {
      title: "Tools & Methods",
      skills: [
        { name: "Git", icon: FaGitAlt, level: 90, color: "orange" },
        { name: "User Research", icon: SiAdobe, level: 88, color: "green" },
        { name: "Wireframing", icon: FaFigma, level: 94, color: "purple" },
        { name: "Prototyping", icon: FaSketch, level: 91, color: "pink" },
      ]
    }
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
            My Skills
          </Badge>
          <Heading
            size="2xl"
            bgGradient={`linear(45deg, ${primaryColor}.500, blue.500)`}
            bgClip="text"
          >
            Expertise & Technologies
          </Heading>
          <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            A comprehensive overview of my technical skills and design expertise 
            that I bring to every project.
          </Text>
        </VStack>

        {/* Skills Grid */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="100%">
          {skillCategories.map((category, categoryIndex) => (
            <MotionCard
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              bg={colorMode === "light" ? "white" : "gray.800"}
              boxShadow="xl"
              borderRadius="2xl"
              overflow="hidden"
            >
              <CardBody>
                <VStack spacing={6} align="start">
                  <Heading size="lg" color={`${primaryColor}.500`}>
                    {category.title}
                  </Heading>
                  
                  <VStack spacing={4} w="100%">
                    {category.skills.map((skill, skillIndex) => (
                      <MotionBox
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        w="100%"
                      >
                        <Tooltip label={`${skill.level}% proficiency`} placement="top">
                          <VStack align="start" spacing={3}>
                            <HStack justify="space-between" w="100%">
                              <HStack spacing={3}>
                                <Icon as={skill.icon} color={`${skill.color}.500`} boxSize={5} />
                                <Text fontWeight="medium">{skill.name}</Text>
                              </HStack>
                              <Text color={`${primaryColor}.500`} fontWeight="bold" fontSize="sm">
                                {skill.level}%
                              </Text>
                            </HStack>
                            <Progress
                              value={skill.level}
                              colorScheme={skill.color}
                              size="sm"
                              borderRadius="full"
                              w="100%"
                              bg={colorMode === "light" ? "gray.200" : "gray.700"}
                            />
                          </VStack>
                        </Tooltip>
                      </MotionBox>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>

        {/* Additional Info */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          textAlign="center"
          maxW="600px"
        >
          <Text fontSize="lg" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            I continuously update my skills to stay current with the latest design trends 
            and development technologies. Always learning, always growing.
          </Text>
        </MotionBox>
      </MotionVStack>
    </Container>
  );
};

export default Skills;