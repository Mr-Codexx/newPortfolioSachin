// src/components/MouseEffect.js
import React, { useContext } from "react";
import { MouseContext } from "../context/MouseContext";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MouseEffect = () => {
  const { mouse, velocity } = useContext(MouseContext);

  return (
    <Box pointerEvents="none" position="fixed" top="0" left="0" zIndex="overlay">
      <motion.div
        style={{
          position: "absolute",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00B5D8 0%, transparent 60%)",
          width: 40,
          height: 40,
          x: mouse.x - 20,
          y: mouse.y - 20,
          opacity: Math.min(1, 0.3 + velocity / 50),
          filter: `blur(${Math.min(10, velocity / 3)}px)`,
        }}
        animate={{
          scale: 1 + velocity / 100,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      />
    </Box>
  );
};

export default MouseEffect;
