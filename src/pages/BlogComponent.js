import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Text,
  Image,
  Badge,
  HStack,
  Button,
  useColorMode,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaArrowRight, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Data from "../data/blogs.json";

const MotionBox = motion(Box);

const Blogs = ({ primaryColor = "blue", secondaryColor = "purple" }) => {
  const { colorMode } = useColorMode();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ✅ Load data from imported JSON (no fetch)
  useEffect(() => {
    setBlogs(Data.blogs);
    setFilteredBlogs(Data.blogs);
    setLoading(false);
  }, []);

  // ✅ Filtering logic
  useEffect(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (blog) => blog.category === selectedCategory
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, blogs]);

  const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

  // ✅ Skeleton Loader
  const BlogSkeleton = () => (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
    >
      <Skeleton height="200px" />
      <VStack spacing={4} p={6} align="start">
        <Skeleton height="20px" width="60%" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
        <Skeleton height="30px" width="40%" />
      </VStack>
    </Box>
  );

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.900"}
      minH="100vh"
      py={20}
    >
      <Container maxW="container.xl">
        <VStack spacing={16} align="center">
          {/* ✅ Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              mb={4}
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              My Blog
            </Text>
            <Text
              color={`${primaryColor}.500`}
              fontSize="lg"
              fontWeight="medium"
            >
              Thoughts and tutorials on web development
            </Text>
          </MotionBox>

          {/* ✅ Search & Filter */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            w="100%"
            maxW="600px"
          >
            <HStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg={colorMode === "light" ? "white" : "gray.800"}
                />
              </InputGroup>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                bg={colorMode === "light" ? "white" : "gray.800"}
                maxW="200px"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Select>
            </HStack>
          </MotionBox>

          {/* ✅ Blog Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((post, index) => (
                <MotionBox
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  bg={colorMode === "light" ? "white" : "gray.800"}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "xl",
                  }}
                >
                  {/* Blog Image */}
                  <Box position="relative" overflow="hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      w="100%"
                      h="200px"
                      objectFit="cover"
                      _hover={{ transform: "scale(1.05)" }}
                      transition="transform 0.3s"
                    />
                    <Badge
                      position="absolute"
                      top={3}
                      left={3}
                      colorScheme={primaryColor}
                      variant="solid"
                      borderRadius="full"
                      px={3}
                    >
                      {post.category}
                    </Badge>
                  </Box>

                  {/* Blog Content */}
                  <VStack spacing={4} p={6} align="start">
                    {/* Meta */}
                    <HStack
                      spacing={4}
                      color={colorMode === "light" ? "gray.500" : "gray.400"}
                      fontSize="sm"
                    >
                      <HStack spacing={1}>
                        <Icon as={FaCalendar} boxSize={3} />
                        <Text>{new Date(post.date).toLocaleDateString()}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FaClock} boxSize={3} />
                        <Text>{post.readTime}</Text>
                      </HStack>
                    </HStack>

                    {/* Title */}
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color={colorMode === "light" ? "gray.800" : "white"}
                    >
                      {post.title}
                    </Text>

                    {/* Excerpt */}
                    <Text
                      color={colorMode === "light" ? "gray.600" : "gray.400"}
                      fontSize="sm"
                      lineHeight="taller"
                    >
                      {post.excerpt}
                    </Text>

                    {/* Tags */}
                    <HStack spacing={2} flexWrap="wrap">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <Badge
                          key={i}
                          colorScheme={secondaryColor}
                          variant="subtle"
                          fontSize="xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>

                    {/* Stats */}
                    <HStack
                      spacing={4}
                      fontSize="sm"
                      color={colorMode === "light" ? "gray.500" : "gray.400"}
                    >
                      <Text>❤️ {post.likes} likes</Text>
                      <Text>💬 {post.comments.length} comments</Text>
                    </HStack>

                    {/* Read More */}
                    <Button
                      as={Link}
                      to={`/blog/${post.id}`}
                      variant="ghost"
                      colorScheme={primaryColor}
                      size="sm"
                      rightIcon={<FaArrowRight />}
                      _hover={{
                        transform: "translateX(5px)",
                      }}
                      transition="all 0.2s"
                    >
                      Read More
                    </Button>
                  </VStack>
                </MotionBox>
              ))
            ) : (
              <Box
                gridColumn={{ base: "1", md: "1 / -1" }}
                textAlign="center"
                py={10}
              >
                <Text
                  fontSize="xl"
                  color={colorMode === "light" ? "gray.600" : "gray.400"}
                >
                  No blogs found matching your criteria.
                </Text>
              </Box>
            )}
          </SimpleGrid>

          {/* ✅ Load More Button (optional) */}
          {!loading && filteredBlogs.length > 0 && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                colorScheme={primaryColor}
                size="lg"
                variant="outline"
                _hover={{
                  transform: "translateY(-2px)",
                  bg: `${primaryColor}.500`,
                  color: "white",
                }}
                transition="all 0.2s"
              >
                Load More Posts
              </Button>
            </MotionBox>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Blogs;
