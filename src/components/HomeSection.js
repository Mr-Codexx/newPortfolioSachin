import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Grid,
  GridItem,
  SlideFade,
  ScaleFade,
} from '@chakra-ui/react';
import AnimatedButton from './AnimatedButton';

const HomeSection = ({ 
  activeSection, 
  skinColor, 
  currentTheme, 
  personalInfo,
  isAnimating 
}) => {
  return (
    <Box maxW="1100px" mx="auto" pt={{ base: '80px', lg: '60px' }} pb="70px">
      <Grid templateColumns={{ base: '1fr', lg: '60% 40%' }} gap={6}>
        <GridItem>
          <SlideFade in={activeSection === 'home' && !isAnimating} offsetX={20}>
            <VStack align="start" spacing={4}>
              <Text fontSize={{ base: '24px', md: '28px', lg: '28px' }} mt="15px" mb="15px">
                Hello, my name is{' '}
                <Text as="span" color={skinColor} fontFamily={personalInfo.logo.logoFamily} 
                  fontSize={{ base: '26px', lg: '30px' }} fontWeight="700">
                  {personalInfo.name}
                </Text>
              </Text>
              <Text fontSize={{ base: '26px', md: '28px', lg: '30px' }} mt="15px" mb="15px">
                I'm a <Text as="span" color={skinColor}>{personalInfo.title}</Text>
              </Text>
              <Text mb="70px" fontSize={{ base: '18px', lg: '20px' }} color={currentTheme.textBlack700}>
                {personalInfo.description}
              </Text>
              <AnimatedButton
                isAnimating={isAnimating}
                bg={skinColor}
                color="white"
                px="35px"
                py="12px"
                borderRadius="40px"
                size={{ base: 'md', lg: 'lg' }}
                as="a"
                href={personalInfo.cvDownloadLink}
              >
                Download CV
              </AnimatedButton>
            </VStack>
          </SlideFade>
        </GridItem>
        <GridItem display={{ base: 'none', lg: 'block' }}>
          <ScaleFade in={activeSection === 'home' && !isAnimating} initialScale={0.8}>
            <Box position="relative" textAlign="center">
              <Box
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  height: '80px',
                  width: '80px',
                  borderTop: `10px solid ${skinColor}`,
                  borderLeft: `10px solid ${skinColor}`,
                  left: '-20px',
                  top: '-40px'
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  height: '80px',
                  width: '80px',
                  borderBottom: `10px solid ${skinColor}`,
                  borderRight: `10px solid ${skinColor}`,
                  right: '20px',
                  bottom: '-40px'
                }}
              >
                <Image
                  src={personalInfo.image}
                  alt="hero image"
                  h="400px"
                  mx="auto"
                  borderRadius="4px"
                />
              </Box>
            </Box>
          </ScaleFade>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomeSection;