import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Button,
  useColorMode,
  Icon,
  Divider,
  Textarea,
  Avatar,
  Input,
  Flex,
  useToast,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  FaCalendar, 
  FaClock, 
  FaHeart, 
  FaShare, 
  FaComment, 
  FaArrowLeft,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink
} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

const MotionBox = motion(Box);

const BlogDetail = ({ primaryColor, secondaryColor, accentColor }) => {
  const { id } = useParams();
  const { colorMode } = useColorMode();
  const toast = useToast();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch('/data/blogs.json');
        const data = await response.json();
        const foundBlog = data.blogs.find(b => b.id === parseInt(id));
        
        if (foundBlog) {
          setBlog(foundBlog);
          setLikes(foundBlog.likes);
          setComments(foundBlog.comments);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !userName.trim()) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newComment = {
      id: comments.length + 1,
      user: userName,
      comment: comment,
      date: new Date().toISOString().split('T')[0],
      avatar: `/api/placeholder/40/40`
    };

    setComments(prev => [newComment, ...prev]);
    setComment("");
    setUserName("");

    toast({
      title: "Comment added successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <Box
        bg={colorMode === "light" ? "white" : "gray.900"}
        minH="100vh"
        py={20}
      >
        <Container maxW="container.lg">
          <VStack spacing={8} align="start">
            <Skeleton height="40px" width="200px" />
            <Skeleton height="400px" width="100%" />
            <SkeletonText mt="4" noOfLines={10} spacing="4" />
          </VStack>
        </Container>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box
        bg={colorMode === "light" ? "white" : "gray.900"}
        minH="100vh"
        py={20}
        textAlign="center"
      >
        <Container maxW="container.lg">
          <Text fontSize="2xl" mb={4}>Blog post not found</Text>
          <Button as={Link} to="/blogs" colorScheme={primaryColor}>
            Back to Blogs
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.900"}
      minH="100vh"
      py={20}
    >
      <Container maxW="container.lg">
        <VStack spacing={8} align="start">
          {/* Back Button */}
          <Button
            as={Link}
            to="/blogs"
            variant="ghost"
            colorScheme={primaryColor}
            leftIcon={<FaArrowLeft />}
            mb={4}
          >
            Back to Blogs
          </Button>

          {/* Blog Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            w="100%"
          >
            <Badge colorScheme={primaryColor} mb={4} fontSize="sm" px={3} py={1}>
              {blog.category}
            </Badge>
            
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={colorMode === "light" ? "gray.800" : "white"}
              lineHeight="shorter"
              mb={4}
            >
              {blog.title}
            </Text>

            <Text
              fontSize="xl"
              color={colorMode === "light" ? "gray.600" : "gray.400"}
              mb={6}
              lineHeight="taller"
            >
              {blog.excerpt}
            </Text>

            {/* Meta Information */}
            <HStack spacing={6} color={colorMode === "light" ? "gray.500" : "gray.400"} mb={8}>
              <HStack spacing={2}>
                <Icon as={FaCalendar} boxSize={4} />
                <Text>{new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaClock} boxSize={4} />
                <Text>{blog.readTime}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaHeart} boxSize={4} />
                <Text>{likes} likes</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaComment} boxSize={4} />
                <Text>{comments.length} comments</Text>
              </HStack>
            </HStack>

            {/* Featured Image */}
            <Image
              src={blog.image}
              alt={blog.title}
              w="100%"
              h="400px"
              objectFit="cover"
              borderRadius="xl"
              mb={8}
            />
          </MotionBox>

          {/* Blog Content */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            w="100%"
          >
            <Text
              color={colorMode === "light" ? "gray.700" : "gray.300"}
              fontSize="lg"
              lineHeight="taller"
              whiteSpace="pre-line"
              mb={8}
            >
              {blog.content}
            </Text>

            {/* Tags */}
            <HStack spacing={2} mb={8} flexWrap="wrap">
              {blog.tags.map((tag, index) => (
                <Badge
                  key={index}
                  colorScheme={secondaryColor}
                  variant="subtle"
                  fontSize="sm"
                  px={3}
                  py={1}
                >
                  #{tag}
                </Badge>
              ))}
            </HStack>
          </MotionBox>

          <Divider />

          {/* Action Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            w="100%"
          >
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              {/* Like Button */}
              <Button
                leftIcon={<FaHeart />}
                colorScheme={liked ? "red" : primaryColor}
                variant={liked ? "solid" : "outline"}
                onClick={handleLike}
              >
                {liked ? "Liked" : "Like"} ({likes})
              </Button>

              {/* Share Buttons */}
              <HStack spacing={2}>
                <Text fontWeight="medium">Share:</Text>
                <Button
                  size="sm"
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={() => handleShare('facebook')}
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  colorScheme="twitter"
                  leftIcon={<FaTwitter />}
                  onClick={() => handleShare('twitter')}
                >
                  Twitter
                </Button>
                <Button
                  size="sm"
                  colorScheme="linkedin"
                  leftIcon={<FaLinkedin />}
                  onClick={() => handleShare('linkedin')}
                >
                  LinkedIn
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<FaLink />}
                  onClick={() => handleShare('copy')}
                >
                  Copy Link
                </Button>
              </HStack>
            </Flex>
          </MotionBox>

          <Divider />

          {/* Comments Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            w="100%"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
              Comments ({comments.length})
            </Text>

            {/* Add Comment Form */}
            <Box
              bg={colorMode === "light" ? "gray.50" : "gray.800"}
              p={6}
              borderRadius="lg"
              mb={8}
            >
              <form onSubmit={handleCommentSubmit}>
                <VStack spacing={4}>
                  <Input
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    bg={colorMode === "light" ? "white" : "gray.700"}
                  />
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    bg={colorMode === "light" ? "white" : "gray.700"}
                  />
                  <Button
                    type="submit"
                    colorScheme={primaryColor}
                    alignSelf="flex-end"
                  >
                    Post Comment
                  </Button>
                </VStack>
              </form>
            </Box>

            {/* Comments List */}
            <VStack spacing={6} align="start">
              {comments.length > 0 ? (
                comments.map((commentItem) => (
                  <Box
                    key={commentItem.id}
                    w="100%"
                    bg={colorMode === "light" ? "gray.50" : "gray.800"}
                    p={4}
                    borderRadius="lg"
                  >
                    <HStack spacing={3} align="start">
                      <Avatar
                        size="sm"
                        src={commentItem.avatar}
                        name={commentItem.user}
                      />
                      <Box flex={1}>
                        <HStack justify="space-between" mb={2}>
                          <Text fontWeight="bold" fontSize="sm">
                            {commentItem.user}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(commentItem.date).toLocaleDateString()}
                          </Text>
                        </HStack>
                        <Text color={colorMode === "light" ? "gray.700" : "gray.300"}>
                          {commentItem.comment}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text color={colorMode === "light" ? "gray.500" : "gray.400"} textAlign="center" w="100%">
                  No comments yet. Be the first to comment!
                </Text>
              )}
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default BlogDetail;