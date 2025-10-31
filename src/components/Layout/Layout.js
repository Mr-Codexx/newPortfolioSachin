import React from 'react';
import {
  Box,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import CircularSidebar from '../Navigation/NavItem';
import MobileHeader from '../Navigation/MobileHeader';

const Layout = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex minH="100vh" bg="gray.900" position="relative">
      {/* Circular Sidebar for desktop */}
      {!isMobile && <CircularSidebar />}

      {/* Mobile header */}
      {isMobile && <MobileHeader />}

      {/* Main content */}
      <Box
        flex="1"
        ml={!isMobile ? '80px' : '0'}
        transition="all 0.3s"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;