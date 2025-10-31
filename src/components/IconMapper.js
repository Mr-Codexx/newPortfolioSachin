import React from 'react';
import {
  FiHome, FiUser, FiList, FiBriefcase, FiMessageSquare,
  FiSun, FiMoon, FiMenu, FiX, FiPhone, FiMapPin, FiMail,
  FiGlobe, FiCalendar, FiSettings, FiFacebook, FiTwitter,
  FiInstagram, FiLinkedin
} from 'react-icons/fi';
import {
  FaMobileAlt, FaLaptopCode, FaPalette, FaCode,
  FaSearch, FaBullhorn
} from 'react-icons/fa';

const iconMap = {
  // Feather Icons
  FiHome, FiUser, FiList, FiBriefcase, FiMessageSquare,
  FiSun, FiMoon, FiMenu, FiX, FiPhone, FiMapPin, FiMail,
  FiGlobe, FiCalendar, FiSettings, FiFacebook, FiTwitter,
  FiInstagram, FiLinkedin,
  
  // Font Awesome Icons
  FaMobileAlt, FaLaptopCode, FaPalette, FaCode,
  FaSearch, FaBullhorn
};

const IconMapper = ({ iconName, ...props }) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default IconMapper;