// pages/Projects.js
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Image,
  Badge,
  Card,
  CardBody,
  Button,
  Icon,
  useColorMode,
  Tag,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaEye } from "react-icons/fa";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionVStack = motion(Box);

const Projects = ({ primaryColor = "teal", colorMode }) => {
  const projects = [
    {
      title: "E-Commerce Platform Redesign",
      description: "Complete redesign of a modern e-commerce platform focusing on user experience and conversion optimization.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["UI/UX Design", "Web Design", "E-commerce"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Mobile Banking App",
      description: "Intuitive mobile banking application with focus on security and user-friendly interface.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Mobile Design", "Fintech", "UI/UX"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Healthcare Dashboard",
      description: "Comprehensive dashboard for healthcare providers to manage patient data and appointments.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Dashboard", "Healthcare", "Data Visualization"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Travel Booking Platform",
      description: "Modern travel booking platform with seamless user experience and beautiful visual design.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Web Design", "Travel", "Booking System"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile application for fitness tracking with social features and progress analytics.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Mobile App", "Fitness", "Analytics"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Brand Identity Package",
      description: "Complete brand identity design including logo, typography, and brand guidelines.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Branding", "Logo Design", "Visual Identity"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
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
            My Work
          </Badge>
          <Heading
            size="2xl"
            bgGradient={`linear(45deg, ${primaryColor}.500, blue.500)`}
            bgClip="text"
          >
            Featured Projects
          </Heading>
          <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            A collection of my recent work that showcases my design process 
            and problem-solving approach.
          </Text>
        </VStack>

        {/* Projects Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
          {projects.map((project, index) => (
            <MotionCard
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              bg={colorMode === "light" ? "white" : "gray.800"}
              boxShadow="xl"
              borderRadius="2xl"
              overflow="hidden"
              whileHover={{ y: -5 }}
              cursor="pointer"
            >
              <CardBody p={0}>
                {/* Project Image */}
                <Box position="relative" overflow="hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    w="100%"
                    h="200px"
                    objectFit="cover"
                    transition="transform 0.3s"
                    _groupHover={{ transform: "scale(1.1)" }}
                  />
                  {project.featured && (
                    <Badge
                      position="absolute"
                      top={3}
                      left={3}
                      colorScheme={primaryColor}
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      Featured
                    </Badge>
                  )}
                  
                  {/* Overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.600"
                    opacity={0}
                    transition="opacity 0.3s"
                    _hover={{ opacity: 1 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <HStack spacing={4}>
                      <Button
                        leftIcon={<FaEye />}
                        colorScheme={primaryColor}
                        size="sm"
                      >
                        View
                      </Button>
                      <Button
                        leftIcon={<FaExternalLinkAlt />}
                        variant="outline"
                        color="white"
                        borderColor="white"
                        size="sm"
                        _hover={{ bg: "whiteAlpha.200" }}
                      >
                        Live
                      </Button>
                    </HStack>
                  </Box>
                </Box>

                {/* Project Info */}
                <VStack spacing={4} p={6} align="start">
                  <Heading size="md">{project.title}</Heading>
                  <Text color={colorMode === "light" ? "gray.600" : "gray.300"} fontSize="sm">
                    {project.description}
                  </Text>
                  
                  {/* Tags */}
                  <HStack spacing={2} flexWrap="wrap">
                    {project.tags.map((tag) => (
                      <Tag
                        key={tag}
                        size="sm"
                        colorScheme={primaryColor}
                        variant="subtle"
                        borderRadius="full"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>

        {/* Call to Action */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          textAlign="center"
        >
          <Button
            colorScheme={primaryColor}
            size="lg"
            rightIcon={<FaExternalLinkAlt />}
            px={8}
          >
            View All Projects
          </Button>
        </MotionBox>
      </MotionVStack>
    </Container>
  );
};

export default Projects;