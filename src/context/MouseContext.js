// src/context/MouseContext.js
import React, { createContext, useState, useEffect } from "react";

export const MouseContext = createContext();

export const MouseProvider = ({ children }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastX = 0, lastY = 0, lastTime = Date.now();

    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = now - lastTime;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const vel = dist / (dt || 1);

      setMouse({ x: e.clientX, y: e.clientY });
      setVelocity(vel * 0.5); // scale velocity for animation
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider value={{ mouse, velocity }}>
      {children}
    </MouseContext.Provider>
  );
};
