import React from 'react';
import { Box, ScaleFade } from '@chakra-ui/react';

const SectionContainer = ({ 
  children, 
  id, 
  activeSection, 
  isAnimating,
  ...props 
}) => (
  <ScaleFade in={activeSection === id && !isAnimating} initialScale={0.95}>
    <Box
      id={id}
      minH="100vh"
      display={activeSection === id ? 'block' : 'none'}
      p={{ base: '0 15px', sm: '0 20px', md: '0 25px', lg: '0 30px' }}
      {...props}
    >
      {children}
    </Box>
  </ScaleFade>
);

export default SectionContainer;