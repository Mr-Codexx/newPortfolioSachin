// components/ResumeDownloadModal.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Box,
  SimpleGrid,
  Progress,
  Icon,
  Tooltip,
  useColorMode,
  useToast,
  Badge,
  Flex,
  Divider,
  IconButton,
  Spinner,
  Collapse,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  DownloadIcon,
  CloseIcon,
  CheckIcon,
  ViewIcon,
  CopyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { FaPalette, FaFilePdf, FaCode, FaReact, FaJava, FaMagic, FaCrown, FaDragon, FaRobot, FaSpaceShuttle, FaRainbow, FaFire, FaMobile, FaDesktop } from "react-icons/fa";
import { SiMaterialdesign, SiTailwindcss, Selenium, Jenkins, Firebase } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const ResumeDownloadModal = ({ isOpen, onClose, primaryColor, secondaryColor, accentColor }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [selectedPalette, setSelectedPalette] = useState("quantum");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const { isOpen: isControlsOpen, onToggle: toggleControls } = useDisclosure({ defaultIsOpen: false });
  
  const previewRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Your actual resume data
  const resumeData = {
    personalInfo: {
      name: "Sachin Sharma",
      title: "Senior Automation Developer | QA Engineer",
      phone: "+917906310812",
      email: "mr-sachinsharma.dev@gmail.com.com",
      linkedin: "linkedin.com/in/sachin-sharma-automation",
      github: "github.com/sachinsharma-dev",
      portfolio: "portfolio.sachinsharma.dev"
    },
    summary: "Results-driven Automation Developer with 3+ years of experience in test automation, framework design, and CI/CD implementation. Specialized in Selenium, Java, ReactJS, Firebase, and modern reporting systems. Recognized for delivering scalable QA solutions that improve reliability and efficiency by 60%+ across healthcare and SaaS platforms.",
    coreCompetencies: [
      "Test Automation (Selenium, TestNG, JUnit)",
      "Java / JavaScript / Python",
      "CI/CD (Jenkins, GitHub Actions)",
      "ReactJS + Firebase Apps",
      "REST API & JSON Validation",
      "ExcelScript Automation",
      "JIRA Integration",
      "Performance Optimization"
    ],
    technicalSkills: {
      languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
      automationTools: ["Selenium", "TestNG", "JUnit", "Postman", "REST-Assured"],
      devopsTools: ["Jenkins", "GitHub Actions", "Docker"],
      frontend: ["ReactJS", "Next.js", "Chakra UI", "Tailwind"],
      cloud: ["Firebase", "Firestore", "Realtime DB"],
      reports: ["Extent Reports", "PDF Export", "Email Notifications"]
    },
    experience: [
      {
        period: "2022 -- Present",
        position: "Senior Automation Developer",
        company: "Confidential Healthcare Organization",
        location: "Remote, India",
        responsibilities: [
          "Designed a scalable test automation framework in Java + Selenium for healthcare contract validation",
          "Automated multi-line validation of key fields like patientChargeable, clinicalSystemUse, and chargeNumberReviewed",
          "Integrated Extent Reports with JIRA issue linking and PDF output for executive dashboards",
          "Built custom Excel and JSON comparison utilities for backend validation",
          "Implemented Java schedulers to send automated HTML email reports"
        ],
        achievements: [
          "Reduced manual validation effort by 60%+ via automation",
          "Developed automated PDF reports linking JIRA issue references",
          "Achieved 40% faster test cycles using parallel execution"
        ]
      }
    ],
    projects: [
      {
        name: "Automated Email Reporting System",
        description: "Java-based scheduler for automated HTML email reports with Firebase triggers and React frontend",
        technologies: ["Java", "React", "Firebase", "Chakra UI"]
      },
      {
        name: "WebCraft – Website Builder Platform",
        description: "React + Firebase app for end-to-end website creation with drag-drop builder",
        technologies: ["React", "Firebase", "Chakra UI", "Framer Motion"]
      },
      {
        name: "Excel Dashboard Automation",
        description: "Office Scripts for automated Excel dashboards with dynamic KPI visualizations",
        technologies: ["ExcelScript", "Office Automation", "JavaScript"]
      }
    ],
    education: {
      year: "2021",
      degree: "B.Tech in Computer Science",
      university: "XYZ University",
      location: "India",
      focus: "Automation & Software Engineering"
    },
    certifications: [
      "Advanced Selenium with Java",
      "ReactJS + Firebase Full Stack",
      "ExcelScript & Office Automation"
    ],
    softSkills: [
      "Analytical Thinking",
      "Collaboration & Communication",
      "Adaptability",
      "Attention to Detail",
      "Problem Solving"
    ],
    interests: [
      "Automation Framework Design",
      "Frontend Engineering",
      "Cloud Integration",
      "AI-Driven Testing"
    ]
  };

  // SUPER DUPER ADVANCED COLOR PALETTES with dark/light mode support
  const resumePalettes = [
    {
      id: "quantum",
      name: "Quantum Matrix",
      primary: colorMode === "light" ? "rgb(0, 100, 255)" : "rgb(0, 255, 255)",
      secondary: colorMode === "light" ? "rgb(150, 0, 200)" : "rgb(255, 0, 255)",
      accent: colorMode === "light" ? "rgb(0, 180, 100)" : "rgb(0, 255, 127)",
      bg: colorMode === "light" ? "rgb(248, 250, 252)" : "rgb(10, 10, 20)",
      text: colorMode === "light" ? "rgb(30, 30, 50)" : "rgb(240, 240, 255)",
      gradient: colorMode === "light" 
        ? "linear-gradient(135deg, #0064ff, #9600c8, #00b464)"
        : "linear-gradient(135deg, #00ffff, #ff00ff, #00ff7f)",
      icon: FaRobot,
      category: "cyber"
    },
    {
      id: "neon",
      name: "Neon Cyberpunk",
      primary: colorMode === "light" ? "rgb(0, 150, 100)" : "rgb(0, 255, 157)",
      secondary: colorMode === "light" ? "rgb(200, 0, 100)" : "rgb(255, 0, 128)",
      accent: colorMode === "light" ? "rgb(0, 120, 200)" : "rgb(0, 204, 255)",
      bg: colorMode === "light" ? "rgb(253, 253, 255)" : "rgb(5, 5, 15)",
      text: colorMode === "light" ? "rgb(20, 20, 30)" : "rgb(255, 255, 255)",
      gradient: colorMode === "light"
        ? "linear-gradient(135deg, #009664, #c80064, #0078c8)"
        : "linear-gradient(135deg, #00ff9d, #ff0080, #00ccff)",
      icon: FaDragon,
      category: "cyber"
    },
    {
      id: "galaxy",
      name: "Deep Galaxy",
      primary: colorMode === "light" ? "rgb(100, 50, 200)" : "rgb(147, 51, 234)",
      secondary: colorMode === "light" ? "rgb(70, 60, 180)" : "rgb(79, 70, 229)",
      accent: colorMode === "light" ? "rgb(200, 60, 120)" : "rgb(236, 72, 153)",
      bg: colorMode === "light" ? "rgb(248, 250, 253)" : "rgb(15, 23, 42)",
      text: colorMode === "light" ? "rgb(40, 40, 60)" : "rgb(226, 232, 240)",
      gradient: colorMode === "light"
        ? "linear-gradient(135deg, #6432c8, #463cb4, #c83c78)"
        : "linear-gradient(135deg, #9333ea, #4f46e5, #ec4899)",
      icon: FaSpaceShuttle,
      category: "cosmic"
    },
    {
      id: "professional",
      name: "Professional Blue",
      primary: colorMode === "light" ? "rgb(0, 82, 147)" : "rgb(66, 133, 244)",
      secondary: colorMode === "light" ? "rgb(46, 125, 50)" : "rgb(52, 168, 83)",
      accent: colorMode === "light" ? "rgb(220, 60, 50)" : "rgb(251, 188, 5)",
      bg: colorMode === "light" ? "rgb(250, 250, 250)" : "rgb(32, 33, 36)",
      text: colorMode === "light" ? "rgb(30, 30, 30)" : "rgb(232, 234, 237)",
      gradient: colorMode === "light"
        ? "linear-gradient(135deg, #005293, #2e7d32, #dc3c32)"
        : "linear-gradient(135deg, #4285f4, #34a853, #fbbc05)",
      icon: FaCrown,
      category: "professional"
    },
    {
      id: "material",
      name: "Material Design",
      primary: colorMode === "light" ? "rgb(103, 58, 183)" : "rgb(187, 134, 252)",
      secondary: colorMode === "light" ? "rgb(233, 30, 99)" : "rgb(245, 124, 0)",
      accent: colorMode === "light" ? "rgb(0, 188, 212)" : "rgb(3, 218, 197)",
      bg: colorMode === "light" ? "rgb(255, 255, 255)" : "rgb(18, 18, 18)",
      text: colorMode === "light" ? "rgb(33, 33, 33)" : "rgb(255, 255, 255)",
      gradient: colorMode === "light"
        ? "linear-gradient(135deg, #673ab7, #e91e63, #00bcd4)"
        : "linear-gradient(135deg, #bb86fc, #f57c00, #03dac5)",
      icon: SiMaterialdesign,
      category: "professional"
    },
    {
      id: "fire",
      name: "Plasma Fire",
      primary: colorMode === "light" ? "rgb(220, 70, 30)" : "rgb(255, 87, 34)",
      secondary: colorMode === "light" ? "rgb(220, 150, 0)" : "rgb(255, 193, 7)",
      accent: colorMode === "light" ? "rgb(200, 30, 80)" : "rgb(233, 30, 99)",
      bg: colorMode === "light" ? "rgb(254, 252, 250)" : "rgb(18, 18, 18)",
      text: colorMode === "light" ? "rgb(40, 30, 20)" : "rgb(255, 255, 255)",
      gradient: colorMode === "light"
        ? "linear-gradient(135deg, #dc461e, #dc9600, #c81e50)"
        : "linear-gradient(135deg, #ff5722, #ffc107, #e91e63)",
      icon: FaFire,
      category: "cyber"
    }
  ];

  const currentPalette = resumePalettes.find(p => p.id === selectedPalette) || resumePalettes[0];

  // Auto-close controls on mobile when preview is visible
  useEffect(() => {
    if (isMobile && isPreviewVisible) {
      toggleControls();
    }
  }, [isMobile, isPreviewVisible]);

  // Update palettes when color mode changes
  useEffect(() => {
    // This will trigger re-render with updated colors
  }, [colorMode]);

  // Simulate download process
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const steps = [10, 30, 60, 80, 95, 100];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDownloadProgress(steps[i]);
    }
    
    await generatePDF();
    
    setIsDownloading(false);
    toast({
      title: "Resume Downloaded!",
      description: "Your resume has been generated and downloaded successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    onClose();
  };

  const generatePDF = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const content = JSON.stringify(resumeData, null, 2);
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume_${selectedPalette}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        resolve();
      }, 1000);
    });
  };

  const copyLaTeXCode = () => {
    const latexCode = generateLaTeXCode();
    navigator.clipboard.writeText(latexCode);
    toast({
      title: "LaTeX Code Copied!",
      description: "LaTeX code has been copied to clipboard.",
      status: "success",
      duration: 2000,
      position: "top",
    });
  };

  const generateLaTeXCode = () => {
    return `% Resume LaTeX Code for ${resumeData.personalInfo.name}
% Generated with ${currentPalette.name} Theme
\\documentclass[11pt,a4paper,sans]{moderncv}
\\moderncvstyle{banking}
\\moderncvcolor{blue}
\\usepackage[scale=0.87]{geometry}

% Colors
\\definecolor{primary}{RGB}{${currentPalette.primary.replace(/[^\d,]/g, '').replace('rgb(', '').replace(')', '')}}
\\definecolor{secondary}{RGB}{${currentPalette.secondary.replace(/[^\d,]/g, '').replace('rgb(', '').replace(')', '')}}
\\definecolor{accent}{RGB}{${currentPalette.accent.replace(/[^\d,]/g, '').replace('rgb(', '').replace(')', '')}}

\\name{${resumeData.personalInfo.name.split(' ')[0]}}{${resumeData.personalInfo.name.split(' ').slice(1).join(' ')}}
\\title{${resumeData.personalInfo.title}}
\\email{${resumeData.personalInfo.email}}
\\phone{${resumeData.personalInfo.phone}}

\\begin{document}
\\makecvtitle

% Professional Summary
\\section{Professional Summary}
${resumeData.summary}

% Add more LaTeX sections here...
\\end{document}`;
  };

  // Enhanced Resume Preview Component with actual data
  const ResumePreview = () => (
    <Box
      ref={previewRef}
      bg={currentPalette.bg}
      color={currentPalette.text}
      p={6}
      borderRadius="xl"
      shadow="2xl"
      maxW="100%"
      maxH="100%"
      overflowY="auto"
      border="2px solid"
      borderColor={currentPalette.primary}
      sx={{
        transform: 'scale(0.8)',
        transformOrigin: 'top center',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          bg: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: currentPalette.primary,
          borderRadius: '4px',
        },
      }}
    >
      {/* Enhanced Header with Gradient */}
      <Box 
        borderBottom={`4px solid ${currentPalette.primary}`}
        pb={4}
        mb={6}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="4px"
          bg={currentPalette.gradient}
          opacity={0.6}
        />
        <Text 
          fontSize="3xl" 
          fontWeight="black" 
          bg={currentPalette.gradient}
          bgClip="text"
          css={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {resumeData.personalInfo.name}
        </Text>
        <Text 
          fontSize="xl" 
          color={currentPalette.accent} 
          fontWeight="bold" 
          mb={2}
          textShadow={`0 0 10px ${currentPalette.accent}40`}
        >
          {resumeData.personalInfo.title}
        </Text>
        <HStack spacing={4} flexWrap="wrap" mt={3}>
          {[
            { icon: "📧", text: resumeData.personalInfo.email },
            { icon: "📱", text: resumeData.personalInfo.phone },
            { icon: "🔗", text: resumeData.personalInfo.linkedin },
            { icon: "⚡", text: resumeData.personalInfo.github }
          ].map((item, index) => (
            <Text 
              key={index}
              fontSize="sm" 
              bg={`${currentPalette.primary}15`}
              px={3}
              py={1}
              borderRadius="full"
              border={`1px solid ${currentPalette.primary}30`}
            >
              {item.icon} {item.text}
            </Text>
          ))}
        </HStack>
      </Box>

      {/* Summary with Glass Effect */}
      <Box mb={6}>
        <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
          🚀 Professional Summary
        </Text>
        <Box 
          bg={`linear-gradient(135deg, ${currentPalette.primary}20, ${currentPalette.secondary}20)`}
          p={4} 
          borderRadius="xl" 
          borderLeft={`4px solid ${currentPalette.primary}`}
          backdropFilter="blur(10px)"
          border={`1px solid ${currentPalette.primary}30`}
        >
          <Text fontSize="sm" lineHeight="1.6">
            {resumeData.summary}
          </Text>
        </Box>
      </Box>

      {/* Two Column Layout */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Left Column */}
        <VStack align="start" spacing={6}>
          {/* Core Competencies */}
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
              ⚡ Core Competencies
            </Text>
            <SimpleGrid columns={1} spacing={2}>
              {resumeData.coreCompetencies.map((skill, index) => (
                <Box
                  key={index}
                  bg={`linear-gradient(135deg, ${currentPalette.secondary}15, ${currentPalette.accent}15)`}
                  p={3}
                  borderRadius="lg"
                  border={`1px solid ${currentPalette.secondary}30`}
                >
                  <Text fontSize="sm" display="flex" alignItems="center">
                    <Box 
                      w="6px" 
                      h="6px" 
                      bg={currentPalette.secondary}
                      borderRadius="full" 
                      mr={3}
                      boxShadow={`0 0 8px ${currentPalette.secondary}`}
                    />
                    {skill}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Technical Skills */}
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
              💻 Technical Skills
            </Text>
            {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
              <Box key={category} mb={3}>
                <Text fontSize="sm" fontWeight="bold" color={currentPalette.secondary} mb={2}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <Flex wrap="wrap" gap={2}>
                  {Array.isArray(skills) && skills.map((skill, idx) => (
                    <Badge 
                      key={idx}
                      bg={`${currentPalette.accent}20`}
                      color={currentPalette.accent}
                      border={`1px solid ${currentPalette.accent}40`}
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>

          {/* Education */}
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
              🎓 Education
            </Text>
            <Box 
              bg={`linear-gradient(135deg, ${currentPalette.primary}15, ${currentPalette.secondary}15)`}
              p={4}
              borderRadius="xl"
              borderLeft={`4px solid ${currentPalette.accent}`}
            >
              <Text fontSize="md" fontWeight="bold" color={currentPalette.text}>
                {resumeData.education.degree}
              </Text>
              <Text fontSize="sm" color={currentPalette.secondary} fontWeight="medium">
                {resumeData.education.university}
              </Text>
              <Text fontSize="xs" color={currentPalette.text} opacity={0.8}>
                {resumeData.education.location} • {resumeData.education.year}
              </Text>
              {resumeData.education.focus && (
                <Text fontSize="xs" color={currentPalette.accent} mt={1}>
                  Focus: {resumeData.education.focus}
                </Text>
              )}
            </Box>
          </Box>

          {/* Certifications */}
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
              📜 Certifications
            </Text>
            <VStack align="start" spacing={2}>
              {resumeData.certifications.map((cert, index) => (
                <Box
                  key={index}
                  bg={`${currentPalette.accent}15`}
                  p={3}
                  borderRadius="lg"
                  border={`1px solid ${currentPalette.accent}30`}
                  w="100%"
                >
                  <Text fontSize="sm" display="flex" alignItems="center">
                    <Box 
                      w="6px" 
                      h="6px" 
                      bg={currentPalette.accent}
                      borderRadius="full" 
                      mr={3}
                      boxShadow={`0 0 8px ${currentPalette.accent}`}
                    />
                    {cert}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>

        {/* Right Column */}
        <VStack align="start" spacing={6}>
          {/* Experience */}
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
              🏆 Professional Experience
            </Text>
            {resumeData.experience.map((exp, index) => (
              <Box 
                key={index} 
                mb={4} 
                p={4} 
                bg={`linear-gradient(135deg, ${currentPalette.primary}15, ${currentPalette.secondary}15)`}
                borderRadius="xl"
                border={`1px solid ${currentPalette.primary}30`}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  w="4px"
                  h="100%"
                  bg={currentPalette.gradient}
                />
                <Text fontSize="md" fontWeight="bold" color={currentPalette.text}>
                  {exp.position}
                </Text>
                <Text fontSize="sm" color={currentPalette.secondary} fontWeight="medium">
                  {exp.company} | {exp.period}
                </Text>
                <Text fontSize="xs" color={currentPalette.text} opacity={0.8} mb={3}>
                  {exp.location}
                </Text>
                
                <Text fontSize="sm" fontWeight="medium" color={currentPalette.primary} mt={4} mb={2}>
                  Key Responsibilities:
                </Text>
                <VStack align="start" spacing={2} mt={2}>
                  {exp.responsibilities.map((resp, idx) => (
                    <Text key={idx} fontSize="xs" display="flex" alignItems="start">
                      <Box 
                        w="6px" 
                        h="6px" 
                        bg={currentPalette.primary}
                        borderRadius="full" 
                        mr={2} 
                        mt={1}
                        flexShrink={0}
                      />
                      {resp}
                    </Text>
                  ))}
                </VStack>

                {exp.achievements && exp.achievements.length > 0 && (
                  <>
                    <Text fontSize="sm" fontWeight="medium" color={currentPalette.accent} mt={4} mb={2}>
                      Key Achievements:
                    </Text>
                    <VStack align="start" spacing={2}>
                      {exp.achievements.map((achievement, idx) => (
                        <Text key={idx} fontSize="xs" display="flex" alignItems="start">
                          <Box 
                            w="6px" 
                            h="6px" 
                            bg={currentPalette.accent}
                            borderRadius="full" 
                            mr={2} 
                            mt={1}
                            flexShrink={0}
                          />
                          {achievement}
                        </Text>
                      ))}
                    </VStack>
                  </>
                )}
              </Box>
            ))}
          </Box>

          {/* Projects */}
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
              🚀 Key Projects
            </Text>
            {resumeData.projects.map((project, index) => (
              <Box 
                key={index} 
                mb={4} 
                p={4}
                bg={`linear-gradient(135deg, ${currentPalette.secondary}15, ${currentPalette.accent}15)`}
                borderRadius="xl"
                border={`1px solid ${currentPalette.secondary}30`}
              >
                <Text fontSize="md" fontWeight="bold" color={currentPalette.accent}>
                  {project.name}
                </Text>
                <Text fontSize="sm" mb={2} color={currentPalette.text} opacity={0.9}>
                  {project.description}
                </Text>
                <Flex wrap="wrap" gap={2} mt={2}>
                  {project.technologies.map((tech, idx) => (
                    <Badge 
                      key={idx}
                      bg={`${currentPalette.primary}20`}
                      color={currentPalette.primary}
                      border={`1px solid ${currentPalette.primary}40`}
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>
        </VStack>
      </SimpleGrid>

      {/* Soft Skills & Interests */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
            🤝 Soft Skills
          </Text>
          <VStack align="start" spacing={2}>
            {resumeData.softSkills.map((skill, index) => (
              <Box
                key={index}
                bg={`${currentPalette.secondary}15`}
                p={3}
                borderRadius="lg"
                border={`1px solid ${currentPalette.secondary}30`}
                w="100%"
              >
                <Text fontSize="sm" display="flex" alignItems="center">
                  <Box 
                    w="6px" 
                    h="6px" 
                    bg={currentPalette.secondary}
                    borderRadius="full" 
                    mr={3}
                  />
                  {skill}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={currentPalette.primary} mb={3}>
            🎯 Interests
          </Text>
          <VStack align="start" spacing={2}>
            {resumeData.interests.map((interest, index) => (
              <Box
                key={index}
                bg={`${currentPalette.accent}15`}
                p={3}
                borderRadius="lg"
                border={`1px solid ${currentPalette.accent}30`}
                w="100%"
              >
                <Text fontSize="sm" display="flex" alignItems="center">
                  <Box 
                    w="6px" 
                    h="6px" 
                    bg={currentPalette.accent}
                    borderRadius="full" 
                    mr={3}
                  />
                  {interest}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Enhanced Footer */}
      <Divider my={6} borderColor={`${currentPalette.primary}40`} />
      <Text 
        fontSize="xs" 
        textAlign="center" 
        color={currentPalette.text}
        opacity={0.7}
        bg={`${currentPalette.primary}10`}
        p={3}
        borderRadius="lg"
      >
        Generated with Advanced Resume Builder • {new Date().toLocaleDateString()} • {currentPalette.name} Theme
      </Text>
    </Box>
  );

  // Group palettes by category
  const paletteCategories = {
    cyber: resumePalettes.filter(p => p.category === 'cyber'),
    cosmic: resumePalettes.filter(p => p.category === 'cosmic'),
    professional: resumePalettes.filter(p => p.category === 'professional'),
  };

  const modalBg = useColorModeValue("white", "gray.900");
  const sidebarBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="full" 
      motionPreset="slideInBottom"
      closeOnOverlayClick={true}
    >
      <ModalOverlay 
        bg="blackAlpha.800" 
        backdropFilter="blur(20px) saturate(180%)"
      />
      <ModalContent
        bg={modalBg}
        m={0}
        maxW="100vw"
        maxH="100vh"
        borderRadius="none"
        overflow="hidden"
        position="relative"
      >
        {/* Enhanced Header with Glass Morphism */}
        <ModalHeader 
          bgGradient={`linear(45deg, ${primaryColor}.500, ${secondaryColor}.500)`}
          color="white"
          py={4}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(255,255,255,0.1)"
            backdropFilter="blur(10px)"
          />
          <HStack justify="space-between" position="relative">
            <HStack>
              <Icon as={FaFilePdf} boxSize={6} />
              <VStack align="start" spacing={0}>
                <Text fontSize="xl" fontWeight="bold">
                  Advanced Resume Builder
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  {resumeData.personalInfo.name}
                </Text>
              </VStack>
            </HStack>
            <HStack>
              {/* Color Mode Toggle */}
              <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton
                  icon={colorMode === 'light' ? <FaMobile /> : <FaDesktop />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  color="white"
                  size="sm"
                  aria-label="Toggle color mode"
                />
              </Tooltip>
              
              {/* Mobile Controls Toggle */}
              {isMobile && (
                <Tooltip label={isControlsOpen ? "Hide Controls" : "Show Controls"}>
                  <IconButton
                    icon={isControlsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={toggleControls}
                    variant="ghost"
                    color="white"
                    size="sm"
                    aria-label="Toggle controls"
                  />
                </Tooltip>
              )}
              <Tooltip label="Toggle Preview">
                <IconButton
                  icon={<ViewIcon />}
                  onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                  variant="ghost"
                  color="white"
                  size="sm"
                />
              </Tooltip>
              <Tooltip label="Copy LaTeX Code">
                <IconButton
                  icon={<CopyIcon />}
                  onClick={copyLaTeXCode}
                  variant="ghost"
                  color="white"
                  size="sm"
                />
              </Tooltip>
              <ModalCloseButton color="white" position="relative" size="lg" />
            </HStack>
          </HStack>
        </ModalHeader>

        <ModalBody p={0} display="flex" flexDirection={{ base: "column", lg: "row" }} h="calc(100vh - 80px)">
          {/* Left Sidebar - Controls with Collapse */}
          <Collapse in={!isMobile || isControlsOpen} animateOpacity>
            <Box
              w={{ base: "100%", lg: "350px" }}
              p={6}
              borderRight={{ base: "none", lg: "1px solid" }}
              borderBottom={{ base: "1px solid", lg: "none" }}
              borderColor="gray.200"
              bg={sidebarBg}
              overflowY="auto"
              maxH={{ base: "50vh", lg: "100%" }}
            >
              <VStack spacing={6} align="stretch">
                {/* Advanced Palette Selection with Categories */}
                <Box>
                  <Text fontWeight="bold" mb={4} display="flex" alignItems="center" fontSize="lg" color={textColor}>
                    <Icon as={FaPalette} mr={3} color={`${primaryColor}.500`} boxSize={5} />
                    Super Advanced Themes
                  </Text>
                  
                  {Object.entries(paletteCategories).map(([category, palettes]) => (
                    <Box key={category} mb={4}>
                      <Text fontSize="sm" fontWeight="semibold" color={textColor} opacity={0.7} mb={2} textTransform="capitalize">
                        {category} Themes
                      </Text>
                      <SimpleGrid columns={2} spacing={3}>
                        {palettes.map((palette) => (
                          <Tooltip key={palette.id} label={palette.name} placement="top" hasArrow>
                            <MotionBox
                              position="relative"
                              cursor="pointer"
                              onClick={() => setSelectedPalette(palette.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Box
                                w="100%"
                                h="70px"
                                borderRadius="lg"
                                bg={palette.gradient}
                                border="3px solid"
                                borderColor={selectedPalette === palette.id ? palette.accent : "transparent"}
                                p={2}
                                position="relative"
                                overflow="hidden"
                              >
                                <Box
                                  w="100%"
                                  h="100%"
                                  borderRadius="md"
                                  bg={palette.bg}
                                  opacity={0.2}
                                />
                                <Icon 
                                  as={palette.icon} 
                                  position="absolute"
                                  top={2}
                                  right={2}
                                  color="white"
                                  opacity={0.8}
                                  boxSize={3}
                                />
                              </Box>
                              {selectedPalette === palette.id && (
                                <MotionBox
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  position="absolute"
                                  top={2}
                                  left={2}
                                  w={4}
                                  h={4}
                                  bg="white"
                                  borderRadius="full"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  shadow="md"
                                >
                                  <CheckIcon color={palette.primary} boxSize={2} />
                                </MotionBox>
                              )}
                            </MotionBox>
                          </Tooltip>
                        ))}
                      </SimpleGrid>
                    </Box>
                  ))}
                </Box>

                {/* Download Progress with Animation */}
                {isDownloading && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Text fontWeight="medium" mb={3} display="flex" alignItems="center" color={textColor}>
                      <Spinner size="sm" mr={2} color={`${primaryColor}.500`} />
                      Generating Advanced PDF...
                    </Text>
                    <Progress
                      value={downloadProgress}
                      colorScheme={primaryColor}
                      borderRadius="full"
                      size="lg"
                      bg="gray.200"
                      hasStripe
                      isAnimated
                    />
                    <Text fontSize="sm" color={textColor} opacity={0.7} mt={2} textAlign="center" fontWeight="bold">
                      {downloadProgress}% • Almost there!
                    </Text>
                  </MotionBox>
                )}

                {/* Enhanced Action Buttons */}
                <VStack spacing={4}>
                  <MotionButton
                    w="100%"
                    colorScheme={primaryColor}
                    leftIcon={isDownloading ? <Spinner size="sm" /> : <DownloadIcon />}
                    onClick={handleDownload}
                    isDisabled={isDownloading}
                    size="lg"
                    height="50px"
                    borderRadius="xl"
                    bgGradient={`linear(45deg, ${primaryColor}.500, ${secondaryColor}.500)`}
                    _hover={{
                      transform: 'translateY(-2px)',
                      shadow: 'xl',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition="all 0.2s"
                  >
                    {isDownloading ? "Generating..." : "Download Super Resume"}
                  </MotionButton>

                  <Button
                    w="100%"
                    variant="outline"
                    colorScheme={secondaryColor}
                    leftIcon={<FaCode />}
                    onClick={copyLaTeXCode}
                    size="md"
                    height="45px"
                    borderRadius="xl"
                    borderWidth="2px"
                    color={textColor}
                  >
                    Copy LaTeX Code
                  </Button>

                  <Text fontSize="xs" color={textColor} opacity={0.6} textAlign="center" lineHeight="1.4">
                    🚀 Super advanced resume builder with AI-powered themes and professional layouts
                  </Text>
                </VStack>

                {/* Current Palette Info with Enhanced Display */}
                <Box 
                  p={4} 
                  borderRadius="xl" 
                  bg={colorMode === "light" ? "white" : "gray.700"} 
                  shadow="lg"
                  border={`1px solid ${currentPalette.primary}30`}
                >
                  <Text fontSize="md" fontWeight="bold" mb={3} display="flex" alignItems="center" color={textColor}>
                    <Icon as={currentPalette.icon} mr={2} color={currentPalette.primary} />
                    Active: {currentPalette.name}
                  </Text>
                  <HStack spacing={2} mb={3}>
                    {[currentPalette.primary, currentPalette.secondary, currentPalette.accent].map((color, index) => (
                      <Tooltip key={index} label={color} hasArrow>
                        <Box 
                          w={8} 
                          h={8} 
                          borderRadius="lg" 
                          bg={color}
                          shadow="md"
                          cursor="pointer"
                          _hover={{ transform: 'scale(1.1)' }}
                          transition="transform 0.2s"
                        />
                      </Tooltip>
                    ))}
                  </HStack>
                  <Box
                    w="100%"
                    h="4px"
                    borderRadius="full"
                    bg={currentPalette.gradient}
                  />
                </Box>
              </VStack>
            </Box>
          </Collapse>

          {/* Right Side - Preview Area */}
          <Box 
            flex={1} 
            p={{ base: 4, lg: 6 }} 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            bg={colorMode === "light" ? "gray.100" : "gray.900"}
            position="relative"
          >
            <AnimatePresence mode="wait">
              {isPreviewVisible ? (
                <MotionBox
                  key="preview"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ResumePreview />
                </MotionBox>
              ) : (
                <MotionBox
                  key="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack spacing={6} color={textColor} opacity={0.6} textAlign="center">
                    <Icon as={FaFilePdf} boxSize={16} />
                    <VStack spacing={2}>
                      <Text fontSize="2xl" fontWeight="bold">
                        Preview Hidden
                      </Text>
                      <Text fontSize="sm" maxW="300px">
                        Click the eye icon 👁️ to reveal your amazing resume preview with the selected theme
                      </Text>
                    </VStack>
                    {isMobile && (
                      <Button
                        colorScheme={primaryColor}
                        onClick={toggleControls}
                        leftIcon={isControlsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        size="sm"
                      >
                        {isControlsOpen ? "Hide Controls" : "Show Controls"}
                      </Button>
                    )}
                  </VStack>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ResumeDownloadModal;
