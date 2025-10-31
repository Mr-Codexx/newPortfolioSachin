import React from 'react';
import { Button } from '@chakra-ui/react';

const AnimatedButton = ({ children, isAnimating = false, ...props }) => (
  <Button
    animation={!isAnimating ? 'pulse 2s infinite' : 'none'}
    _hover={{
      animation: 'none',
      transform: 'scale(1.05)'
    }}
    transition="all 0.3s ease"
    {...props}
  >
    {children}
  </Button>
);

export default AnimatedButton;