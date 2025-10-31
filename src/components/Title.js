"use client"
import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import portfolioData from "../data/portfolioData.json"

const MotionBox = motion(Box)
const MotionText = motion(Text)

export default function SuperAdvancedRollingTitles({ 
  primaryColor = "blue",
  enable3D = true,
  enableParticles = true,
  enableSound = false,
  interactive = true
}) {
  const titles = portfolioData.personalInfo.title
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const audioRef = useRef(null)
  const containerRef = useRef(null)

  // Enhanced color system
  const glowColor = useColorModeValue(
    `${primaryColor}.400`,
    `${primaryColor}.200`
  )
  const shadowColor = useColorModeValue(
    `${primaryColor}.100`,
    `${primaryColor}.800`
  )

  // Particle system
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setIndex((prev) => (prev + 1) % titles.length)
        
        // Add particles on title change
        if (enableParticles) {
          addParticles()
        }
        
        // Play sound effect
        if (enableSound && audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch(() => {})
        }
      }
    }, 2500)
    
    return () => clearInterval(interval)
  }, [titles.length, isHovered, enableParticles, enableSound])

  // Particle animation
  useEffect(() => {
    if (!enableParticles) return

    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev.filter(particle => particle.life > 0)
            .map(particle => ({
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              life: particle.life - 1,
              scale: particle.scale * 0.95
            }))
      )
    }, 16)

    return () => clearInterval(particleInterval)
  }, [enableParticles])

  const addParticles = () => {
    const newParticles = Array.from({ length: 15 }, () => ({
      id: Math.random(),
      x: Math.random() * 260,
      y: 20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2 + 1,
      life: 60,
      scale: Math.random() * 0.8 + 0.2
    }))
    setParticles(prev => [...prev, ...newParticles])
  }

  const currentTitle = titles[index]
  const titleText = typeof currentTitle === "string" ? currentTitle : currentTitle.text
  const titleColor = typeof currentTitle === "string" ? primaryColor : currentTitle.color

  // Mouse move handler for interactive effects
  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePosition({ x, y })
  }

  // 3D transform based on mouse position
  const get3DTransform = () => {
    if (!enable3D || !interactive) return {}
    
    return {
      rotateY: mousePosition.x * 10,
      rotateX: mousePosition.y * -10,
      scale: isHovered ? 1.05 : 1
    }
  }

  // Advanced animation variants
  const containerVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }

  const titleVariants = {
    initial: { 
      y: 60, 
      opacity: 0,
      rotateX: 45,
      filter: "blur(10px)"
    },
    animate: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8
      }
    },
    exit: { 
      y: -60, 
      opacity: 0,
      rotateX: -45,
      filter: "blur(10px)",
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.6
      }
    }
  }

  const backgroundVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <Box position="relative" ref={containerRef}>
      {/* Hidden audio element for sound effects */}
      {enableSound && (
        <audio ref={audioRef} preload="auto">
          <source src="/sounds/transition.mp3" type="audio/mpeg" />
        </audio>
      )}

      {/* Animated background */}
      <MotionBox
        position="absolute"
        top="-20px"
        left="-20px"
        right="-20px"
        bottom="-20px"
        borderRadius="xl"
        bgGradient={`radial(circle at center, ${shadowColor} 0%, transparent 70%)`}
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        key={`bg-${index}`}
        zIndex={0}
      />

      {/* Particle system */}
      {enableParticles && particles.map(particle => (
        <MotionBox
          key={particle.id}
          position="absolute"
          left={`${particle.x}px`}
          top={`${particle.y}px`}
          w="2px"
          h="2px"
          borderRadius="full"
          bg={`${titleColor}.400`}
          initial={{ scale: particle.scale, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ 
            x: particle.vx * particle.life,
            y: particle.vy * particle.life
          }}
        />
      ))}

      {/* Main container */}
      <MotionBox
        ref={containerRef}
        overflow="hidden"
        h="40px"
        w="300px"
        // border="2px solid"
        // borderColor={`${titleColor}.300`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        borderRadius="full"
        bg="transparent"
        // _dark={{ bg: "gray.800" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setMousePosition({ x: 0, y: 0 })
        }}
        onMouseMove={handleMouseMove}
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        style={{
          perspective: 1000,
          ...get3DTransform()
        }}
        boxShadow={`0 0 30px ${shadowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`}
        zIndex={1}
      >
        {/* Animated border glow */}
        <MotionBox
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderRadius="xl"
          border="2px solid transparent"
          background={`linear-gradient(45deg, ${glowColor}, transparent, ${glowColor}) border-box`}
          mask="linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)"
          maskComposite="exclude"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        <AnimatePresence mode="wait">
          <MotionBox
            key={index}
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="full"
            style={{
              transformStyle: enable3D ? "preserve-3d" : "flat"
            }}
          >
            <MotionText
              fontWeight="extrabold"
              color={`${titleColor}.600`}
              _dark={{ color: `${titleColor}.300` }}
              fontSize="xl"
              textAlign="center"
              textShadow={`0 0 20px ${shadowColor}`}
              initial={{ textShadow: `0 0 0px ${shadowColor}` }}
              animate={{ textShadow: `0 0 20px ${shadowColor}` }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {titleText}
            </MotionText>
          </MotionBox>
        </AnimatePresence>

        {/* Progress indicator */}
        <MotionBox
          position="absolute"
          bottom="0"
          left="0"
          height="2px"
          bg={`${titleColor}.500`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          key={`progress-${index}`}
        />
      </MotionBox>

    </Box>
  )
}