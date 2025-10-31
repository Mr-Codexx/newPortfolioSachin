import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const MobileHeader = ({ onMenuClick }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      py={3}
    >
      <Flex align="center" justify="space-between">
        <IconButton
          icon={<FiMenu />}
          variant="ghost"
          aria-label="Open menu"
          onClick={onMenuClick}
          size="lg"
        />
        
        <Flex align="center" gap={3}>
          <Text fontSize="lg" fontWeight="bold">
            Portfolio
          </Text>
          <Avatar
            size="sm"
            src="https://i.pinimg.com/564x/3c/fa/12/3cfa1280ad3858b935aad427b2b47aa4.jpg"
            name="John Doe"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileHeader;