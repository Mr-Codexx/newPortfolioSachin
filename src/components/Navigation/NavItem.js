// components/Navigation/NavItem.js
import React from "react";
import {
  HStack,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  VStack,
  IconButton,
  Box,
  useDisclosure,
  useToken,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

// Component imports for each nav item
import About from "../../pages/About";
import Skills from "../../pages/SkillsComponent";
import Projects from "../../pages/ProjectsComponent";
import Blog from "../../pages/BlogComponent";
import Contact from "../../pages/ContactComponent";

// Motion-enabled Chakra components
const MotionText = motion(Text);
const MotionModalContent = motion(ModalContent);

const NavItem = ({ primaryColor = "teal" }) => {
  const { colorMode } = useColorMode();
  const [primaryHex] = useToken("colors", [`${primaryColor}.500`]);

  // State for modal management
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    { label: "Home", component: null },
    { label: "About", component: "About" },
    { label: "Skills", component: "Skills" },
    { label: "Projects", component: "Projects" },
    { label: "Blog", component: "Blog" },
    { label: "Contact", component: "Contact" },
  ];

  const handleNavClick = (item) => {
    if (item.component) {
      setCurrentComponent(item.component);
      onOpen();
    } else {
      // Handle Home click
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMobileNavClick = (itemLabel) => {
    const item = navItems.find(navItem => navItem.label === itemLabel);
    if (item) {
      handleNavClick(item);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setCurrentComponent(null), 300);
  };

  // Modal variants for smooth animation
  const modalVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Render the appropriate component
  const renderComponent = () => {
    const componentProps = { primaryColor, colorMode };

    switch (currentComponent) {
      case "About":
        return <About {...componentProps} />;
      case "Skills":
        return <Skills {...componentProps} />;
      case "Projects":
        return <Projects {...componentProps} />;
      case "Blog":
        return <Blog {...componentProps} />;
      case "Contact":
        return <Contact {...componentProps} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <HStack
        spacing={6}
        display={{ base: "none", lg: "flex" }}
        color={colorMode === "light" ? "gray.600" : "gray.300"}
        fontWeight="semibold"
      >
        {navItems.map((item, index) => (
          <MotionText
            key={item.label}
            cursor="pointer"
            position="relative"
            _hover={{ color: `${primaryColor}.500` }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            onClick={() => handleNavClick(item)}
            sx={{
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "0%",
                height: "2px",
                bg: `${primaryColor}.500`,
                transition: "width 0.3s ease",
              },
              "&:hover::after": {
                width: "100%",
              },
            }}
          >
            {item.label}
          </MotionText>
        ))}
      </HStack>

      {/* Mobile Menu */}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          variant="outline"
          display={{ base: "flex", lg: "none" }}
          borderRadius="md"
          size={{ base: "sm", md: "md" }}
          aria-label="Navigation menu"
        />
        <MenuList
          bg={colorMode === "light" ? "white" : "gray.800"}
          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => handleMobileNavClick(item.label)}
              _hover={{
                bg: colorMode === "light" ? `${primaryColor}.50` : `${primaryColor}.900`,
                color: `${primaryColor}.500`,
              }}
              transition="all 0.2s"
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Fullscreen Component Modal */}
      {/* Fullscreen Component Modal */}
      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="full"
            isCentered={false}
            motionPreset="none"
            blockScrollOnMount={true}
          >
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />

            <MotionModalContent
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              w="100vw"
              h="100vh"
              m={0}
              p={0}
              bg={colorMode === "light" ? "white" : "gray.900"}
              overflow="hidden"
            >
              {/* Close Button (floating in top-right corner) */}
              <IconButton
                aria-label="Close modal"
                icon={<CloseIcon />}
                onClick={handleClose}
                variant="ghost"
                borderRadius="full"
                size="lg"
                position="absolute"
                top={4}
                right={4}
                zIndex={10}
                color={colorMode === "light" ? "gray.600" : "gray.300"}
                _hover={{
                  bg: colorMode === "light" ? "gray.100" : "gray.700",
                  color: primaryHex,
                  transform: "scale(1.1)",
                }}
                transition="all 0.2s"
              />

              {/* Fullscreen Body Content */}
              <Box
                w="100%"
                h="100%"
                overflowY="auto"
                display="flex"
                flexDirection="column"
              >
                {renderComponent()}
              </Box>
            </MotionModalContent>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NavItem;