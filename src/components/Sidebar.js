import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  ScaleFade,
} from '@chakra-ui/react';
import IconMapper from './IconMapper';

const Sidebar = ({
  isMobile,
  activeSection,
  handleNavClick,
  skinColor,
  currentTheme,
  navigation,
  personalInfo,
  onClose
}) => {
  const handleNavItemClick = (sectionId) => {
    handleNavClick(sectionId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <ScaleFade in initialScale={0.8}>
      <Box
        w={{ base: '100%', lg: '270px' }}
        h={{ base: 'auto', lg: '100vh' }}
        bg={currentTheme.bgBlack100}
        position={{ base: 'relative', lg: 'fixed' }}
        left={{ base: 0, lg: 0 }}
        top={0}
        zIndex={10}
        p={{ base: '20px', lg: '30px' }}
        borderRight="1px solid"
        borderColor={currentTheme.bgBlack50}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        transition="all 0.3s ease"
      >
        {/* Logo */}
        <Box position="absolute" top="50px" fontSize={{ base: '24px', lg: '30px' }} textTransform="capitalize">
          <Text
            as="a"
            href="#"
            color={currentTheme.textBlack900}
            fontWeight="700"
            p={{ base: '10px 15px', lg: '15px 20px' }}
            fontSize={{ base: '24px', lg: '30px' }}
            letterSpacing="5px"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              width: { base: '15px', lg: '20px' },
              height: { base: '15px', lg: '20px' },
              borderBottom: `5px solid ${skinColor}`,
              borderLeft: `5px solid ${skinColor}`,
              bottom: 0,
              left: 0
            }}
            _after={{
              content: '""',
              position: 'absolute',
              width: { base: '15px', lg: '20px' },
              height: { base: '15px', lg: '20px' },
              borderTop: `5px solid ${skinColor}`,
              borderRight: `5px solid ${skinColor}`,
              top: 0,
              right: 0
            }}
          >
            {personalInfo.logo.firstName}
            <span style={{ 
              fontFamily: personalInfo.logo.logoFamily, 
              fontSize: '40px' 
            }}>
              {personalInfo.logo.lastName}
            </span>
          </Text>
        </Box>

        {/* Navigation */}
        <VStack mt="50px" spacing="20px" w="100%" align="start">
          {navigation.map((item) => (
            <Box
              key={item.id}
              as="a"
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavItemClick(item.id);
              }}
              fontSize={{ base: '14px', lg: '16px' }}
              fontWeight="600"
              display="block"
              color={activeSection === item.id ? skinColor : currentTheme.textBlack900}
              p="5px 15px"
              borderBottom={`1px solid ${currentTheme.bgBlack50}`}
              w="100%"
              _hover={{ 
                textDecoration: 'none', 
                color: skinColor,
                transform: 'translateX(5px)'
              }}
              transition="all 0.3s ease"
            >
              <HStack>
                <IconMapper iconName={item.icon} />
                <Text>{item.label}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </ScaleFade>
  );
};

export default Sidebar;