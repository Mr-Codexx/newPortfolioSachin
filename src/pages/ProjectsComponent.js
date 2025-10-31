import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Text,
  Image,
  Badge,
  HStack,
  Button,
  useColorMode,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaEye } from "react-icons/fa";

const MotionBox = motion(Box);

const Projects = ({ primaryColor, secondaryColor, accentColor }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full Stack"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application",
      image: "/api/placeholder/400/250",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Frontend"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather information dashboard",
      image: "/api/placeholder/400/250",
      technologies: ["React", "API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Frontend"
    },
    {
      id: 4,
      title: "Social Media API",
      description: "REST API for social media platform",
      image: "/api/placeholder/400/250",
      technologies: ["Express", "MongoDB", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Backend"
    }
  ];

  const openProjectModal = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.900"}
      minH="100vh"
      py={20}
    >
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
              My Projects
            </Text>
            <Text
              color={`${primaryColor}.500`}
              fontSize="lg"
              fontWeight="medium"
            >
              Some of my recent work
            </Text>
          </MotionBox>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="100%"
          >
            {projects.map((project, index) => (
              <MotionBox
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                bg={colorMode === "light" ? "white" : "gray.800"}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "xl"
                }}
                // transition="all 0.3s"
              >
                {/* Project Image */}
                <Box position="relative" overflow="hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    w="100%"
                    h="200px"
                    objectFit="cover"
                    _hover={{ transform: "scale(1.05)" }}
                    transition="transform 0.3s"
                  />
                  <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    colorScheme={primaryColor}
                    variant="solid"
                    borderRadius="full"
                    px={3}
                  >
                    {project.category}
                  </Badge>
                </Box>

                {/* Project Content */}
                <VStack spacing={4} p={6} align="start">
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={colorMode === "light" ? "gray.800" : "white"}
                  >
                    {project.title}
                  </Text>
                  <Text
                    color={colorMode === "light" ? "gray.600" : "gray.400"}
                    fontSize="sm"
                    lineHeight="taller"
                  >
                    {project.description}
                  </Text>

                  {/* Technologies */}
                  <HStack spacing={2} flexWrap="wrap">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        colorScheme={secondaryColor}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </HStack>

                  {/* Action Buttons */}
                  <HStack spacing={3} w="100%" justify="space-between">
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme={primaryColor}
                      leftIcon={<FaGithub />}
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      Code
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={primaryColor}
                      rightIcon={<FaExternalLinkAlt />}
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme={accentColor}
                      leftIcon={<FaEye />}
                      onClick={() => openProjectModal(project)}
                    >
                      View
                    </Button>
                  </HStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Project Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "white" : "gray.800"}
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
        >
          <ModalHeader>
            {selectedProject?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedProject && (
              <VStack spacing={4} align="start">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  w="100%"
                  borderRadius="md"
                />
                <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>
                  {selectedProject.description}
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {selectedProject.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      colorScheme={primaryColor}
                      variant="subtle"
                    >
                      {tech}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Projects;