import { useEffect, useState } from 'react';

export const useScreenDetector = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(document.body);
    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const isMobile = width <= 540;
  const isSmallTablet = width <= 780;
  const isTablet = width <= 1024;
  const isMediumScreen = width <= 1500;
  const isDesktop = width > 1500;

  return { isMobile, isSmallTablet, isTablet, isMediumScreen, isDesktop };
};
