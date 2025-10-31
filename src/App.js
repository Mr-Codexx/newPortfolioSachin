import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MouseProvider } from "./context/MouseContext";
import MouseEffect from "./utils/MouseEffect";

// Components
import HeroSection from "./components/WelcomePage";
import Skills from "./pages/SkillsComponent";
import BlogDetail from "./pages/BlogsDetails";
import Projects from "./pages/ProjectsComponent";
import Blogs from "./pages/BlogComponent";
import Contact from "./pages/ContactComponent";
import About from "./pages/About";

const App = () => {
  return (
    <ChakraProvider>
      <MouseProvider>
        <MouseEffect />
        <Router>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Router>
      </MouseProvider>
    </ChakraProvider>
  );
};

export default App;
