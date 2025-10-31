// pages/Blog.js
import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Image,
  Badge,
  Card,
  CardBody,
  Button,
  Icon,
  useColorMode,
  Avatar,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaReadme } from "react-icons/fa";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionVStack = motion(Box);

const Blog = ({ primaryColor = "teal", colorMode }) => {
  const blogPosts = [
    {
      title: "The Future of UI Design in 2024",
      excerpt: "Exploring the latest trends and technologies shaping the future of user interface design.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "UI Design",
      readTime: "5 min read",
      date: "Dec 15, 2024",
      author: "Lena",
      featured: true
    },
    {
      title: "Building Design Systems That Scale",
      excerpt: "Best practices for creating and maintaining design systems that grow with your product.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Design Systems",
      readTime: "7 min read",
      date: "Dec 10, 2024",
      author: "Lena",
      featured: true
    },
    {
      title: "Accessibility in Modern Web Design",
      excerpt: "Why accessibility matters and how to implement it in your design process.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Accessibility",
      readTime: "6 min read",
      date: "Dec 5, 2024",
      author: "Lena",
      featured: false
    },
    {
      title: "The Psychology of Color in Branding",
      excerpt: "How color choices impact user perception and brand identity.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Branding",
      readTime: "8 min read",
      date: "Nov 28, 2024",
      author: "Lena",
      featured: false
    },
    {
      title: "Mobile-First Design Strategy",
      excerpt: "Why designing for mobile first leads to better user experiences.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Mobile Design",
      readTime: "5 min read",
      date: "Nov 20, 2024",
      author: "Lena",
      featured: false
    },
    {
      title: "User Research Methods That Work",
      excerpt: "Effective user research techniques for gathering meaningful insights.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "User Research",
      readTime: "9 min read",
      date: "Nov 15, 2024",
      author: "Lena",
      featured: false
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <MotionVStack
        spacing={12}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <VStack spacing={6} textAlign="center" maxW="800px">
          <Badge colorScheme={primaryColor} px={4} py={2} borderRadius="full" fontSize="lg">
            My Blog
          </Badge>
          <Heading
            size="2xl"
            bgGradient={`linear(45deg, ${primaryColor}.500, blue.500)`}
            bgClip="text"
          >
            Thoughts & Insights
          </Heading>
          <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.300"}>
            Sharing my experiences, insights, and thoughts on design, 
            technology, and creative processes.
          </Text>
        </VStack>

        {/* Featured Posts */}
        <VStack spacing={8} w="100%" align="start">
          <Heading size="lg" color={`${primaryColor}.500`}>Featured Posts</Heading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="100%">
            {blogPosts.filter(post => post.featured).map((post, index) => (
              <MotionCard
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                bg={colorMode === "light" ? "white" : "gray.800"}
                boxShadow="xl"
                borderRadius="2xl"
                overflow="hidden"
                whileHover={{ y: -5 }}
                cursor="pointer"
              >
                <CardBody p={0}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    w="100%"
                    h="200px"
                    objectFit="cover"
                  />
                  <VStack spacing={4} p={6} align="start">
                    <Badge colorScheme={primaryColor} borderRadius="full" px={3}>
                      {post.category}
                    </Badge>
                    <Heading size="md">{post.title}</Heading>
                    <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
                      {post.excerpt}
                    </Text>
                    
                    <HStack justify="space-between" w="100%" pt={2}>
                      <HStack spacing={4}>
                        <HStack spacing={1}>
                          <Icon as={FaCalendar} color="gray.500" boxSize={3} />
                          <Text fontSize="sm" color="gray.500">{post.date}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={FaReadme} color="gray.500" boxSize={3} />
                          <Text fontSize="sm" color="gray.500">{post.readTime}</Text>
                        </HStack>
                      </HStack>
                      <HStack spacing={2}>
                        <Avatar size="xs" name={post.author} />
                        <Text fontSize="sm" color="gray.500">{post.author}</Text>
                      </HStack>
                    </HStack>
                    
                    <Button
                      rightIcon={<FaArrowRight />}
                      variant="ghost"
                      colorScheme={primaryColor}
                      size="sm"
                      mt={2}
                    >
                      Read More
                    </Button>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>
        </VStack>

        {/* All Posts */}
        <VStack spacing={8} w="100%" align="start">
          <Heading size="lg" color={`${primaryColor}.500`}>All Posts</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <MotionCard
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                bg={colorMode === "light" ? "white" : "gray.800"}
                boxShadow="md"
                borderRadius="xl"
                overflow="hidden"
                whileHover={{ y: -3 }}
                cursor="pointer"
              >
                <CardBody>
                  <VStack spacing={3} align="start">
                    <Badge colorScheme={primaryColor} borderRadius="full" px={2}>
                      {post.category}
                    </Badge>
                    <Heading size="sm">{post.title}</Heading>
                    <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.300"}>
                      {post.excerpt}
                    </Text>
                    
                    <HStack justify="space-between" w="100%" pt={2}>
                      <Text fontSize="xs" color="gray.500">{post.date}</Text>
                      <Text fontSize="xs" color="gray.500">{post.readTime}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Newsletter CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          textAlign="center"
          w="100%"
        >
          <Card bg={colorMode === "light" ? `${primaryColor}.50` : `${primaryColor}.900`} borderRadius="2xl">
            <CardBody py={8}>
              <VStack spacing={4}>
                <Heading size="lg">Stay Updated</Heading>
                <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
                  Get the latest articles and design resources delivered to your inbox.
                </Text>
                <HStack spacing={3} w="100%" maxW="400px">
                  <Button colorScheme={primaryColor} flex={1}>
                    Subscribe
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </MotionBox>
      </MotionVStack>
    </Container>
  );
};

export default Blog;