import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';

export const usePortfolioData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setData(portfolioData);
  }, []);

  return data;
};