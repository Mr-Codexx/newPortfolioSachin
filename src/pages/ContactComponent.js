import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
  Button,
  useColorMode,
  HStack,
  Icon,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const MotionBox = motion(Box);

const Contact = ({ primaryColor, secondaryColor, accentColor }) => {
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "mrsachinsharma-dev@gmail.com",
      link: "mailto:mrsachinsharma-dev@gmail.com"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 7906310812",
      link: "tel:+917906310812"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Madhapur, Hyderabad, India",
      link: "#"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAlert(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    }, 2000);
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
              Get In Touch
            </Text>
            <Text
              color={`${primaryColor}.500`}
              fontSize="lg"
              fontWeight="medium"
            >
              Let's work together
            </Text>
          </MotionBox>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            w="100%"
          >
            {/* Contact Information */}
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <VStack spacing={8} align="start">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color={colorMode === "light" ? "gray.800" : "white"}
                >
                  Let's talk about everything!
                </Text>
                <Text
                  color={colorMode === "light" ? "gray.600" : "gray.400"}
                  lineHeight="taller"
                >
                  Whether you have a project in mind, need consultation, 
                  or just want to say hello, I'd love to hear from you.
                </Text>

                {/* Contact Info */}
                <VStack spacing={4} align="start" w="100%">
                  {contactInfo.map((info, index) => (
                    <HStack
                      key={index}
                      spacing={4}
                      p={4}
                      borderRadius="lg"
                      bg={colorMode === "light" ? "gray.50" : "gray.800"}
                      w="100%"
                      _hover={{
                        transform: "translateX(5px)",
                        bg: colorMode === "light" ? "gray.100" : "gray.700"
                      }}
                      transition="all 0.2s"
                    >
                      <Icon
                        as={info.icon}
                        color={`${primaryColor}.500`}
                        boxSize={5}
                      />
                      <VStack align="start" spacing={0}>
                        <Text
                          fontSize="sm"
                          color={colorMode === "light" ? "gray.500" : "gray.400"}
                        >
                          {info.label}
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="medium"
                          color={colorMode === "light" ? "gray.800" : "white"}
                        >
                          {info.value}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </MotionBox>

            {/* Contact Form */}
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Box
                bg={colorMode === "light" ? "white" : "gray.800"}
                p={8}
                borderRadius="xl"
                boxShadow="lg"
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
              >
                {showAlert && (
                  <Alert status="success" mb={4} borderRadius="md">
                    <AlertIcon />
                    Message sent successfully! I'll get back to you soon.
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%">
                      <FormControl isRequired>
                        <FormLabel fontSize="sm">Name</FormLabel>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          bg={colorMode === "light" ? "white" : "gray.700"}
                          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm">Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          bg={colorMode === "light" ? "white" : "gray.700"}
                          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl isRequired>
                      <FormLabel fontSize="sm">Subject</FormLabel>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        bg={colorMode === "light" ? "white" : "gray.700"}
                        borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="sm">Message</FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={5}
                        bg={colorMode === "light" ? "white" : "gray.700"}
                        borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme={primaryColor}
                      size="lg"
                      w="100%"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      rightIcon={<FaPaperPlane />}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg"
                      }}
                      transition="all 0.2s"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </Box>
            </MotionBox>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;