// pages/Contact.js
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Input,
  Textarea,
  Button,
  Icon,
  useColorMode,
  Badge,
  Card,
  CardBody,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaDribbble,
  FaBehance,
  FaPaperPlane,
} from "react-icons/fa";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionVStack = motion(Box);
const Contact = ({ primaryColor = "teal", colorMode }) => {
  const contactMethods = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "hello@lena.design",
      description: "Send me an email anytime",
      color: "red"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon - Fri from 9am to 6pm",
      color: "green"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "San Francisco, CA",
      description: "Available for remote work",
      color: "blue"
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, name: "LinkedIn", url: "#", color: "linkedin" },
    { icon: FaTwitter, name: "Twitter", url: "#", color: "twitter" },
    { icon: FaDribbble, name: "Dribbble", url: "#", color: "pink" },
    { icon: FaBehance, name: "Behance", url: "#", color: "blue" },
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
            Get In Touch
          </Badge>
          <Heading
            size="2xl"
            bgGradient={`linear(45deg, ${primaryColor}.500, blue.500)`}
            bgClip="text"
          >
            Let's Work Together
          </Heading>
          <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            Have a project in mind? Let's discuss how we can bring your ideas to life 
            and create something amazing together.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="100%">
          {/* Contact Information */}
          <MotionVStack
            spacing={8}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Methods */}
            <VStack spacing={6} w="100%">
              {contactMethods.map((method, index) => (
                <MotionCard
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  w="100%"
                  bg={colorMode === "light" ? "white" : "gray.800"}
                  boxShadow="lg"
                  borderRadius="xl"
                >
                  <CardBody>
                    <HStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="xl"
                        bg={`${method.color}.500`}
                        color="white"
                      >
                        <Icon as={method.icon} boxSize={6} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="lg">{method.title}</Text>
                        <Text color={`${primaryColor}.500`} fontWeight="semibold">
                          {method.value}
                        </Text>
                        <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.400"}>
                          {method.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </MotionCard>
              ))}
            </VStack>

            {/* Social Links */}
            <VStack spacing={4} w="100%">
              <Text fontWeight="semibold" fontSize="lg">Follow Me</Text>
              <HStack spacing={4}>
                {socialLinks.map((social, index) => (
                  <MotionBox
                    key={social.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <Button
                      as="a"
                      href={social.url}
                      target="_blank"
                      size="lg"
                      colorScheme={social.color}
                      borderRadius="full"
                      w="50px"
                      h="50px"
                      p={0}
                    >
                      <Icon as={social.icon} boxSize={5} />
                    </Button>
                  </MotionBox>
                ))}
              </HStack>
            </VStack>
          </MotionVStack>

          {/* Contact Form */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card bg={colorMode === "light" ? "white" : "gray.800"} boxShadow="xl" borderRadius="2xl">
              <CardBody p={8}>
                <VStack spacing={6}>
                  <Heading size="lg">Send a Message</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Input 
                        placeholder="Your first name" 
                        bg={colorMode === "light" ? "white" : "gray.700"}
                        borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input 
                        placeholder="Your last name" 
                        bg={colorMode === "light" ? "white" : "gray.700"}
                        borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                      />
                    </FormControl>
                  </SimpleGrid>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      bg={colorMode === "light" ? "white" : "gray.700"}
                      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Subject</FormLabel>
                    <Input 
                      placeholder="What's this about?" 
                      bg={colorMode === "light" ? "white" : "gray.700"}
                      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Message</FormLabel>
                    <Textarea 
                      placeholder="Tell me about your project..." 
                      rows={5}
                      bg={colorMode === "light" ? "white" : "gray.700"}
                      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    />
                  </FormControl>

                  <Button
                    colorScheme={primaryColor}
                    size="lg"
                    w="100%"
                    rightIcon={<FaPaperPlane />}
                    type="submit"
                  >
                    Send Message
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </MotionBox>
        </SimpleGrid>

        {/* Additional Info */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          textAlign="center"
          maxW="600px"
        >
          <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
            I typically respond to all messages within 24 hours. 
            Let's start a conversation about your next project!
          </Text>
        </MotionBox>
      </MotionVStack>
    </Container>
  );
};

export default Contact;