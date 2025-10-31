import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  useBreakpointValue,
  Container,
  useColorMode,
  IconButton,
  AspectRatio,
  Image,
  Badge,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  useDisclosure,
  useMediaQuery,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import {
  DownloadIcon,
  ExternalLinkIcon,
  MoonIcon,
  SunIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
  FaDribbble,
  FaBehance,
  FaArrowDown,
  FaPlay,
  FaPalette,
  FaStar,
  FaCode,
  FaRocket,
} from "react-icons/fa";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import NavItem from "./Navigation/NavItem";
import HireMeModal from "./HireMeModal";
import portfolioData from '../data/portfolioData.json';
import RollingTitles from "./Title";
import Resume from "./Resume";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHStack = motion(HStack);

const HeroSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode, toggleColorMode } = useColorMode();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Color Palette State
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [secondaryColor, setSecondaryColor] = useState("teal");
  const [accentColor, setAccentColor] = useState("purple");

  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isHireMeOpen, onOpen: onHireMeOpen, onClose: onHireMeClose } = useDisclosure();

  // Enhanced color palettes with 12 options
  const colorPalettes = [
    {
      name: "Ocean Blue",
      primary: "blue",
      secondary: "teal",
      accent: "cyan",
      gradient: "linear(45deg, blue.500, teal.500)"
    },
    {
      name: "Sunset",
      primary: "orange",
      secondary: "red",
      accent: "yellow",
      gradient: "linear(45deg, orange.500, red.500)"
    },
    {
      name: "Forest",
      primary: "green",
      secondary: "lime",
      accent: "emerald",
      gradient: "linear(45deg, green.500, lime.500)"
    },
    {
      name: "Royal",
      primary: "purple",
      secondary: "pink",
      accent: "violet",
      gradient: "linear(45deg, purple.500, pink.500)"
    },
    {
      name: "Sunshine",
      primary: "yellow",
      secondary: "orange",
      accent: "amber",
      gradient: "linear(45deg, yellow.500, orange.500)"
    },
    {
      name: "Berry",
      primary: "pink",
      secondary: "purple",
      accent: "rose",
      gradient: "linear(45deg, pink.500, purple.500)"
    },
    {
      name: "Sky",
      primary: "cyan",
      secondary: "blue",
      accent: "teal",
      gradient: "linear(45deg, cyan.500, blue.500)"
    },
    {
      name: "Earth",
      primary: "brown",
      secondary: "orange",
      accent: "amber",
      gradient: "linear(45deg, brown.500, orange.500)"
    },
    {
      name: "Neon",
      primary: "green",
      secondary: "blue",
      accent: "cyan",
      gradient: "linear(45deg, green.400, blue.400)"
    },
    {
      name: "Warm",
      primary: "red",
      secondary: "orange",
      accent: "yellow",
      gradient: "linear(45deg, red.500, orange.500)"
    },
    {
      name: "Cool",
      primary: "purple",
      secondary: "blue",
      accent: "indigo",
      gradient: "linear(45deg, purple.500, blue.500)"
    },
    {
      name: "Nature",
      primary: "green",
      secondary: "teal",
      accent: "emerald",
      gradient: "linear(45deg, green.500, teal.500)"
    },
  ];

  // Load settings from localStorage
  useEffect(() => {
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    const savedSecondaryColor = localStorage.getItem('secondaryColor');
    const savedAccentColor = localStorage.getItem('accentColor');

    if (savedPrimaryColor) setPrimaryColor(savedPrimaryColor);
    if (savedSecondaryColor) setSecondaryColor(savedSecondaryColor);
    if (savedAccentColor) setAccentColor(savedAccentColor);
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    localStorage.setItem('accentColor', accentColor);
  }, [primaryColor, secondaryColor, accentColor]);

  // Mouse movement and cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradientShift = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  // Icon mapping
  const iconMap = {
    FaDribbble, FaBehance, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter, FaFacebookF
  };

  // Get current palette
  const currentPalette = colorPalettes.find(palette =>
    palette.primary === primaryColor && palette.secondary === secondaryColor
  ) || colorPalettes[0];

  // Skeleton preview component for color palettes
  const PaletteSkeletonPreview = ({ palette, isSelected }) => (
    <Box
      p={3}
      borderRadius="lg"
      border="2px solid"
      borderColor={isSelected ? `${palette.primary}.500` : "gray.200"}
      bg={colorMode === "light" ? "white" : "gray.700"}
      cursor="pointer"
      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
      transition="all 0.2s"
    >
      {/* Gradient Preview */}
      <Box
        h="60px"
        borderRadius="md"
        bgGradient={palette.gradient}
        mb={3}
        position="relative"
        overflow="hidden"
      >
        {/* Animated shimmer effect */}
        <Box
          position="absolute"
          top={0}
          left={-100}
          w="50px"
          h="100%"
          bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
          animation={`${keyframes`
            0% { left: -100px; }
            100% { left: 100%; }
          `} 2s infinite`}
        />
      </Box>

      {/* Skeleton UI Preview */}
      <VStack spacing={2} align="start">
        <Skeleton height="12px" width="70%" borderRadius="full" startColor={`${palette.primary}.200`} endColor={`${palette.primary}.400`} />
        <Skeleton height="8px" width="90%" borderRadius="full" startColor={`${palette.secondary}.200`} endColor={`${palette.secondary}.400`} />
        <HStack spacing={2} width="100%">
          <SkeletonCircle size="20px" startColor={`${palette.accent}.200`} endColor={`${palette.accent}.400`} />
          <Skeleton height="8px" flex={1} borderRadius="full" startColor={`${palette.primary}.200`} endColor={`${palette.primary}.400`} />
        </HStack>
        <HStack spacing={1} width="100%">
          <Skeleton height="6px" width="30%" borderRadius="full" startColor={`${palette.secondary}.200`} endColor={`${palette.secondary}.400`} />
          <Skeleton height="6px" width="40%" borderRadius="full" startColor={`${palette.accent}.200`} endColor={`${palette.accent}.400`} />
        </HStack>
      </VStack>

      {/* Palette Name */}
      <Text
        fontSize="xs"
        fontWeight="medium"
        textAlign="center"
        mt={2}
        color={colorMode === "light" ? "gray.700" : "gray.300"}
      >
        {palette.name}
        {isSelected && (
          <Icon as={FaStar} color={`${palette.primary}.500`} ml={1} boxSize={2} />
        )}
      </Text>
    </Box>
  );

  // Custom cursor component
  const CustomCursor = () => (
    <>
      {/* Main cursor */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        w="20px"
        h="20px"
        borderRadius="full"
        bg={`${primaryColor}.500`}
        pointerEvents="none"
        zIndex={9999}
        style={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        animate={{
          scale: cursorVariant === "hover" ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Outer ring */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        w="40px"
        h="40px"
        borderRadius="full"
        border="2px solid"
        borderColor={`${secondaryColor}.500`}
        pointerEvents="none"
        zIndex={9998}
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        animate={{
          scale: cursorVariant === "hover" ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
      />
    </>
  );

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Settings Button */}
      <MotionBox
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={1000}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <Tooltip label="Theme Settings">
          <IconButton
            aria-label="UI Settings"
            icon={<SettingsIcon />}
            onClick={onSettingsOpen}
            colorScheme={primaryColor}
            borderRadius="full"
            size="sm"
            boxShadow="lg"
            _hover={{
              transform: "scale(1.1)",
              bg: `${primaryColor}.600`,
            }}
            transition="all 0.2s"
          />
        </Tooltip>
      </MotionBox>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "white" : "gray.800"}
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
        >
          <ModalHeader>
            <HStack>
              <Icon as={FaPalette} color={`${primaryColor}.500`} />
              <Text>Choose Your Theme</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Select a color palette to transform the entire interface
              </Text>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} w="100%">
                <Text> Mode : </Text>
                <IconButton
                  aria-label="Toggle color mode"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  size="sm"
                  colorScheme={primaryColor}
                />
              </SimpleGrid>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} w="100%">
                {colorPalettes.map((palette) => {
                  const isSelected = primaryColor === palette.primary && secondaryColor === palette.secondary;
                  return (
                    <Box
                      key={palette.name}
                      onClick={() => {
                        setPrimaryColor(palette.primary);
                        setSecondaryColor(palette.secondary);
                        setAccentColor(palette.accent);
                      }}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <PaletteSkeletonPreview
                        palette={palette}
                        isSelected={isSelected}
                      />
                    </Box>
                  );
                })}
              </SimpleGrid>

              <HStack justify="space-between" w="100%" pt={4}>
                <Button
                  onClick={() => {
                    setPrimaryColor("blue");
                    setSecondaryColor("teal");
                    setAccentColor("purple");
                  }}
                  variant="outline"
                  colorScheme={primaryColor}
                  size="sm"
                  leftIcon={<FaRocket />}
                >
                  Reset Default
                </Button>
                <Button
                  onClick={onSettingsClose}
                  colorScheme={primaryColor}
                  size="sm"
                  leftIcon={<FaCode />}
                >
                  Apply Theme
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Hire Me Modal */}
      <HireMeModal
        isOpen={isHireMeOpen}
        onClose={onHireMeClose}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        accentColor={accentColor}
      />

      {/* Main Hero Section */}
      <Box
        position="relative"
        bg={colorMode === "light" ? "white" : "gray.900"}
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        overflow="hidden"
        onMouseEnter={() => setCursorVariant("default")}
      >
        {/* Background with dynamic gradient */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient={
            colorMode === "light"
              ? `linear(135deg, ${primaryColor}.50 0%, ${secondaryColor}.50 50%, ${accentColor}.50 100%)`
              : `linear(135deg, gray.800 0%, gray.900 50%, gray.800 100%)`
          }
          backgroundSize="400% 400%"
          animation={`${gradientShift} 15s ease infinite`}
          opacity={0.7}
        />

        {/* Animated background elements */}
        <MotionBox
          position="absolute"
          top="10%"
          right="10%"
          w="200px"
          h="200px"
          borderRadius="full"
          bgGradient={`linear(45deg, ${primaryColor}.400, ${secondaryColor}.500)`}
          opacity={0.1}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Container
          maxW="container.xl"
          position="relative"
          zIndex={2}
          py={8}
        >
          {/* Header */}
          <MotionFlex
            justify="space-between"
            align="center"
            mb={8}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <Flex align="center">
              <Text
                fontWeight="bold"
                fontSize={{ base: "xl", md: "2xl" }}
                bgGradient={`linear(45deg, ${primaryColor}.500, ${secondaryColor}.500)`}
                bgClip="text"
              >
                {portfolioData.personalInfo.logo}
              </Text>
              <Badge
                ml={2}
                colorScheme={primaryColor}
                variant="subtle"
                fontSize="xs"
                display={{ base: "none", sm: "block" }}
              >
                {portfolioData.personalInfo.tagline}
              </Badge>
            </Flex><Flex
              as="nav"
              w="100%"
              justify="space-between" // places nav items and button at opposite ends
              align="center"
              py={2}
              px={6} // optional padding for spacing
            >
              {/* Centered Nav Section */}
              <Flex flex="1" justify="center">
                <HStack spacing={4}>
                  <NavItem
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    accentColor={accentColor}
                  />
                </HStack>
              </Flex>

              {/* Right-Aligned Hire Me Button */}
              <Button
                bg={`${primaryColor}.500`}
                color="white"
                size="sm"
                borderRadius="md"
                rightIcon={<ExternalLinkIcon />}
                onClick={onHireMeOpen}
                _hover={{
                  bg: `${primaryColor}.600`,
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {portfolioData.buttons.hireMe}
              </Button>
            </Flex>

          </MotionFlex>

          {/* Hero Content */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="space-between"
            gap={8}
          >
            {/* Text Section */}
            <VStack
              align={{ base: "center", lg: "flex-start" }}
              textAlign={{ base: "center", lg: "left" }}
              spacing={6}
              flex={1}
              maxW={{ lg: "500px" }}
            >
              <MotionVStack
                align={{ base: "center", lg: "flex-start" }}
                spacing={4}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Main Heading */}
                <Box>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="bold"
                    color={colorMode === "light" ? "gray.800" : "white"}
                    lineHeight="shorter"
                  >
                    Hi, I'm{" "}
                    <Text
                      as="span"
                      bgGradient={`linear(45deg, ${primaryColor}.500, ${secondaryColor}.500)`}
                      bgClip="text"
                    >
                      {portfolioData.personalInfo.name}
                    </Text>
                  </Text>
                </Box>

                {/* Subtitle */}
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="medium"
                  color={`${accentColor}.500`}
                >
                  <RollingTitles
                    titles={portfolioData.personalInfo.title}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                </Text>

                {/* Description */}
                <Text
                  color={colorMode === "light" ? "gray.600" : "gray.400"}
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="taller"
                  maxW="500px"
                >
                  {portfolioData.personalInfo.description}
                </Text>

                {/* Stats */}
                <HStack
                  spacing={6}
                  pt={2}
                  wrap="wrap"
                  justify={{ base: "center", lg: "flex-start" }}
                >
                  {portfolioData.stats.map((stat, index) => (
                    <VStack
                      key={stat.label}
                      align="center"
                      spacing={0}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <Text
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="bold"
                        color={`${primaryColor}.500`}
                      >
                        {stat.number}
                      </Text>
                      <Text
                        fontSize="xs"
                        color={colorMode === "light" ? "gray.600" : "gray.400"}
                      >
                        {stat.label}
                      </Text>
                    </VStack>
                  ))}
                </HStack>
              </MotionVStack>

              {/* Action Buttons */}
              <MotionHStack
                spacing={4}
                pt={2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                flexWrap="wrap"
                justify={{ base: "center", lg: "flex-start" }}
              >
                <MotionButton
                  bg={`${primaryColor}.500`}
                  color="white"
                  size={{ base: "sm", md: "md" }}
                  rightIcon={<DownloadIcon />}
                  _hover={{
                    bg: `${primaryColor}.600`,
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsResumeOpen(true)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {portfolioData.buttons.downloadCV}
                </MotionButton>


                <Button
                  variant="outline"
                  colorScheme={secondaryColor}
                  size={{ base: "sm", md: "md" }}
                  leftIcon={<FaPlay />}
                  _hover={{
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {portfolioData.buttons.watchReel}
                </Button>

                {/* Mobile Hire Me Button */}
                <Button
                  bg={`${accentColor}.500`}
                  color="white"
                  size="sm"
                  onClick={onHireMeOpen}
                  display={{ base: "flex", sm: "none" }}
                  _hover={{
                    bg: `${accentColor}.600`,
                  }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {portfolioData.buttons.hireMe}
                </Button>
              </MotionHStack>

              {/* Social Links */}
              <VStack spacing={3} pt={4}>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color={colorMode === "light" ? "gray.500" : "gray.400"}
                  letterSpacing="wide"
                >
                  FOLLOW ME ON
                </Text>
                <HStack spacing={2}>
                  {portfolioData.socialLinks.map((social, index) => {
                    const SocialIcon = iconMap[social.icon];
                    return (
                      <Tooltip key={social.label} label={social.label}>
                        <Box
                          as="button"
                          border="1px solid"
                          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                          borderRadius="full"
                          w="35px"
                          h="35px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color={colorMode === "light" ? "gray.600" : "gray.400"}
                          _hover={{
                            color: `${accentColor}.500`,
                            borderColor: `${accentColor}.500`,
                            transform: "scale(1.1)",
                          }}
                          transition="all 0.2s"
                          onMouseEnter={() => setCursorVariant("hover")}
                          onMouseLeave={() => setCursorVariant("default")}
                        >
                          <Icon as={SocialIcon} boxSize={3} />
                        </Box>
                      </Tooltip>
                    );
                  })}
                </HStack>
              </VStack>
            </VStack>

            {/* Hero Image */}
            <MotionBox
              flex={1}
              position="relative"
              maxW={{ base: "300px", md: "400px", lg: "500px" }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <AspectRatio ratio={4 / 5} maxW="100%">
                <Box
                  position="relative"

                  overflow="hidden"

                  _hover={{
                    borderColor: `${secondaryColor}.300`,
                    transform: "scale(1.02)",
                  }}
                  transition="all 0.3s"
                >
                  <Image
                    // src={portfolioData.personalInfo.image}
                    src="./img.png"
                    alt={portfolioData.personalInfo.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transform="scaleX(-1)" 
                  />
                </Box>
              </AspectRatio>
            </MotionBox>
          </Flex>

          <Resume
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
          />

          {/* Scroll Indicator */}
          <MotionBox
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <VStack spacing={1}>
              <Text
                fontSize="xs"
                color={`${secondaryColor}.500`}
              >
                SCROLL TO EXPLORE
              </Text>
              <MotionBox
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon as={FaArrowDown} color={`${primaryColor}.500`} boxSize={3} />
              </MotionBox>
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
};

// Motion components
const MotionButton = motion(Button);
const MotionVStack = motion(VStack);

export default HeroSection;