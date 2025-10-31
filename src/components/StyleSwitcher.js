import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Grid,
  GridItem,
  SlideFade,
} from '@chakra-ui/react';
import IconMapper from './IconMapper';

const StyleSwitcher = ({ 
  isOpen, 
  colorMode, 
  toggleColorMode, 
  skinColor, 
  setSkinColor, 
  colorPalettes,
  currentTheme 
}) => {
  return (
    <SlideFade in={isOpen} offsetX="100px">
      <Box
        position="fixed"
        right="0"
        top="80px"
        p="15px"
        w="250px"
        border={`1px solid ${currentTheme.bgBlack50}`}
        bg={currentTheme.bgBlack100}
        zIndex="101"
        borderRadius="5px"
        transition="all 0.3s ease"
      >
        <VStack spacing={4}>
          <HStack w="100%" justify="space-between">
            <Text color={currentTheme.textBlack700} fontSize="16px" fontWeight="600">
              Theme Colors
            </Text>
            <IconButton
              size="sm"
              icon={colorMode === 'dark' ? <IconMapper iconName="FiSun" /> : <IconMapper iconName="FiMoon" />}
              onClick={toggleColorMode}
              color={skinColor}
            />
          </HStack>
          
          <Grid templateColumns="repeat(5, 1fr)" gap={2} w="100%">
            {colorPalettes.map((palette) => (
              <GridItem key={palette.color}>
                <Box
                  h="30px"
                  w="30px"
                  borderRadius="50%"
                  bg={palette.color}
                  cursor="pointer"
                  onClick={() => setSkinColor(palette.color)}
                  border={skinColor === palette.color ? '2px solid white' : 'none'}
                  boxShadow={skinColor === palette.color ? '0 0 10px rgba(255,255,255,0.5)' : 'none'}
                  _hover={{ transform: 'scale(1.1)' }}
                  transition="all 0.2s ease"
                  title={palette.name}
                />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Box>
    </SlideFade>
  );
};

export default StyleSwitcher;