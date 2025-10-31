import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Progress,
  Icon,
  Box,
  useColorMode,
  SimpleGrid,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ScaleFade,
  SlideFade,
  useToast,
} from "@chakra-ui/react";
import {
  FaPaperPlane,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const HireMeModal = ({ isOpen, onClose, primaryColor, secondaryColor }) => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    projectType: "",
    description: "",
    nda: false,
    newsletter: true,
  });

  const projectTypes = [
    "Web Development",
    "Mobile App",
    "Cloud Infrastructure",
    "DevOps Setup",
    "Consultation",
    "Full Stack Project",
    "Other",
  ];

  const budgets = [
    "$1K - $5K",
    "$5K - $15K",
    "$15K - $30K",
    "$30K - $50K",
    "$50K+",
  ];

  const timelines = [
    "1-2 weeks",
    "2-4 weeks",
    "1-2 months",
    "2-4 months",
    "4+ months",
  ];

  const steps = [
    { number: 1, title: "Basic Info", icon: FaStar },
    { number: 2, title: "Project Details", icon: FaRocket },
    { number: 3, title: "Review & Submit", icon: FaPaperPlane },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "",
        timeline: "",
        projectType: "",
        description: "",
        nda: false,
        newsletter: true,
      });
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Project submitted successfully!",
      description: "I'll get back to you within 24 hours.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const getStepProgress = () => (step / 3) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg="blackAlpha.700"
        backdropFilter="blur(10px)"
      />
      <ModalContent
        bg={colorMode === "light" ? "white" : "gray.900"}
        borderRadius="none"
        minH="100vh"
        position="relative"
        overflow="hidden"
      >
        {/* Animated Background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient={`linear(135deg, ${primaryColor}.50 0%, ${secondaryColor}.50 50%, blue.50 100%)`}
          opacity={colorMode === "light" ? 0.1 : 0.05}
          zIndex={0}
        />

        <ModalHeader
          position="relative"
          zIndex={2}
          bg={colorMode === "light" ? "white" : "gray.900"}
          borderBottom="1px"
          borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          py={8}
        >
          <VStack spacing={4} align="center">
            <HStack>
              <Icon as={FaRocket} color={`${primaryColor}.500`} boxSize={6} />
              <Text
                fontSize="3xl"
                fontWeight="bold"
                bgGradient={`linear(45deg, ${primaryColor}.500, ${secondaryColor}.500)`}
                bgClip="text"
              >
                Let's Work Together!
              </Text>
            </HStack>
            <Text color={colorMode === "light" ? "gray.600" : "gray.400"} textAlign="center">
              Tell me about your project and I'll get back to you within 24 hours
            </Text>
          </VStack>
        </ModalHeader>

        <ModalCloseButton
          size="lg"
          top={8}
          right={8}
          borderRadius="full"
          bg={colorMode === "light" ? "white" : "gray.800"}
          boxShadow="lg"
          _hover={{
            bg: colorMode === "light" ? "gray.100" : "gray.700",
            transform: "scale(1.1)",
          }}
          transition="all 0.3s"
        />

        <ModalBody position="relative" zIndex={2} py={8}>
          {/* Progress Steps */}
          <VStack spacing={8} maxW="4xl" mx="auto">
            {/* Step Indicators */}
            <SimpleGrid columns={{ base: 3, md: 3 }} spacing={4} w="100%">
              {steps.map((stepItem, index) => (
                <MotionBox
                  key={stepItem.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VStack
                    spacing={2}
                    p={4}
                    borderRadius="xl"
                    bg={
                      step >= stepItem.number
                        ? `${primaryColor}.500`
                        : colorMode === "light"
                        ? "gray.100"
                        : "gray.700"
                    }
                    color={step >= stepItem.number ? "white" : "inherit"}
                    position="relative"
                    _hover={{ transform: "translateY(-2px)" }}
                    transition="all 0.3s"
                  >
                    <HStack>
                      <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg={step >= stepItem.number ? "white" : "gray.300"}
                        color={step >= stepItem.number ? `${primaryColor}.500` : "gray.500"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        fontSize="sm"
                      >
                        {step > stepItem.number ? (
                          <Icon as={FaCheck} boxSize={3} />
                        ) : (
                          stepItem.number
                        )}
                      </Box>
                      <Icon as={stepItem.icon} boxSize={4} />
                    </HStack>
                    <Text fontSize="sm" fontWeight="medium">
                      {stepItem.title}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>

            {/* Progress Bar */}
            <Progress
              value={getStepProgress()}
              w="100%"
              h="2"
              borderRadius="full"
              colorScheme={primaryColor}
              bg={colorMode === "light" ? "gray.200" : "gray.600"}
            />

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <MotionVStack
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  spacing={6}
                  w="100%"
                  maxW="2xl"
                >
                  <ScaleFade in>
                    <VStack spacing={6} w="100%">
                      <FormControl isRequired>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          size="lg"
                          borderRadius="xl"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@company.com"
                          size="lg"
                          borderRadius="xl"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name (optional)"
                          size="lg"
                          borderRadius="xl"
                        />
                      </FormControl>

                      <HStack w="100%" pt={4}>
                        <Button
                          flex={1}
                          size="lg"
                          borderRadius="xl"
                          onClick={onClose}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                        <Button
                          flex={1}
                          size="lg"
                          borderRadius="xl"
                          colorScheme={primaryColor}
                          onClick={nextStep}
                          isDisabled={!formData.name || !formData.email}
                          rightIcon={<Icon as={FaRocket} />}
                        >
                          Continue
                        </Button>
                      </HStack>
                    </VStack>
                  </ScaleFade>
                </MotionVStack>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <MotionVStack
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  spacing={6}
                  w="100%"
                  maxW="2xl"
                >
                  <ScaleFade in>
                    <VStack spacing={6} w="100%">
                      <FormControl isRequired>
                        <FormLabel>Project Type</FormLabel>
                        <Select
                          value={formData.projectType}
                          onChange={(e) => handleInputChange("projectType", e.target.value)}
                          placeholder="Select project type"
                          size="lg"
                          borderRadius="xl"
                        >
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Estimated Budget</FormLabel>
                        <Select
                          value={formData.budget}
                          onChange={(e) => handleInputChange("budget", e.target.value)}
                          placeholder="Select your budget range"
                          size="lg"
                          borderRadius="xl"
                        >
                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Timeline</FormLabel>
                        <Select
                          value={formData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          placeholder="Select project timeline"
                          size="lg"
                          borderRadius="xl"
                        >
                          {timelines.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Project Description</FormLabel>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Tell me about your project requirements, goals, and any specific technologies you're interested in..."
                          size="lg"
                          borderRadius="xl"
                          minH="120px"
                        />
                      </FormControl>

                      <HStack w="100%" pt={4}>
                        <Button
                          flex={1}
                          size="lg"
                          borderRadius="xl"
                          onClick={prevStep}
                          variant="outline"
                        >
                          Back
                        </Button>
                        <Button
                          flex={1}
                          size="lg"
                          borderRadius="xl"
                          colorScheme={primaryColor}
                          onClick={nextStep}
                          isDisabled={!formData.projectType || !formData.budget || !formData.timeline}
                          rightIcon={<Icon as={FaPaperPlane} />}
                        >
                          Review Project
                        </Button>
                      </HStack>
                    </VStack>
                  </ScaleFade>
                </MotionVStack>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <MotionVStack
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  spacing={6}
                  w="100%"
                  maxW="2xl"
                >
                  <AnimatePresence>
                    {isSuccess ? (
                      <MotionVStack
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        spacing={6}
                        textAlign="center"
                        py={8}
                      >
                        <Box
                          w={20}
                          h={20}
                          borderRadius="full"
                          bg={`${primaryColor}.500`}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                          mb={4}
                        >
                          <Icon as={FaCheck} boxSize={8} />
                        </Box>
                        <Text fontSize="2xl" fontWeight="bold">
                          Project Submitted Successfully!
                        </Text>
                        <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>
                          Thank you for your interest. I'll review your project and get back to you within 24 hours.
                        </Text>
                        <Button
                          mt={4}
                          colorScheme={primaryColor}
                          onClick={onClose}
                          size="lg"
                          borderRadius="xl"
                        >
                          Close
                        </Button>
                      </MotionVStack>
                    ) : (
                      <ScaleFade in>
                        <VStack spacing={6} w="100%">
                          <Alert
                            status="info"
                            borderRadius="xl"
                            variant="subtle"
                          >
                            <AlertIcon />
                            <Box>
                              <AlertTitle>Ready to submit!</AlertTitle>
                              <AlertDescription>
                                Review your project details below before submitting.
                              </AlertDescription>
                            </Box>
                          </Alert>

                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                            <Box
                              p={4}
                              borderRadius="xl"
                              bg={colorMode === "light" ? "gray.50" : "gray.700"}
                            >
                              <Text fontWeight="bold" mb={2}>Contact Info</Text>
                              <Text>{formData.name}</Text>
                              <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>
                                {formData.email}
                              </Text>
                              {formData.company && (
                                <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>
                                  {formData.company}
                                </Text>
                              )}
                            </Box>

                            <Box
                              p={4}
                              borderRadius="xl"
                              bg={colorMode === "light" ? "gray.50" : "gray.700"}
                            >
                              <Text fontWeight="bold" mb={2}>Project Details</Text>
                              <HStack>
                                <Badge colorScheme={primaryColor}>
                                  {formData.projectType}
                                </Badge>
                              </HStack>
                              <HStack mt={2}>
                                <Icon as={FaDollarSign} color="green.500" />
                                <Text fontSize="sm">{formData.budget}</Text>
                              </HStack>
                              <HStack mt={1}>
                                <Icon as={FaCalendarAlt} color="blue.500" />
                                <Text fontSize="sm">{formData.timeline}</Text>
                              </HStack>
                            </Box>
                          </SimpleGrid>

                          {formData.description && (
                            <Box
                              p={4}
                              borderRadius="xl"
                              bg={colorMode === "light" ? "gray.50" : "gray.700"}
                              w="100%"
                            >
                              <Text fontWeight="bold" mb={2}>Project Description</Text>
                              <Text color={colorMode === "light" ? "gray.600" : "gray.400"}>
                                {formData.description}
                              </Text>
                            </Box>
                          )}

                          <VStack spacing={4} w="100%" pt={4}>
                            <Checkbox
                              isChecked={formData.nda}
                              onChange={(e) => handleInputChange("nda", e.target.checked)}
                              colorScheme={primaryColor}
                            >
                              I require an NDA (Non-Disclosure Agreement)
                            </Checkbox>

                            <Checkbox
                              isChecked={formData.newsletter}
                              onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                              colorScheme={primaryColor}
                            >
                              Send me project updates and tech insights
                            </Checkbox>
                          </VStack>

                          <HStack w="100%" pt={4}>
                            <Button
                              flex={1}
                              size="lg"
                              borderRadius="xl"
                              onClick={prevStep}
                              variant="outline"
                            >
                              Back
                            </Button>
                            <Button
                              flex={1}
                              size="lg"
                              borderRadius="xl"
                              colorScheme={primaryColor}
                              onClick={handleSubmit}
                              isLoading={isSubmitting}
                              loadingText="Submitting..."
                              rightIcon={<Icon as={FaPaperPlane} />}
                            >
                              Submit Project
                            </Button>
                          </HStack>
                        </VStack>
                      </ScaleFade>
                    )}
                  </AnimatePresence>
                </MotionVStack>
              )}
            </AnimatePresence>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HireMeModal;