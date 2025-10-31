import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
// import Experience from '../pages/Experience';
// import Projects from '../pages/Projects';
// import Skills from '../pages/Skills';
// import Services from '../pages/Services';
// import Contact from '../pages/Contact';
// import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
};

export default AppRoutes;