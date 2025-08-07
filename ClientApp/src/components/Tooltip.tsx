import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.css';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  position = 'right', 
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

    let style: React.CSSProperties = {};

    switch (position) {
      case 'right':
        style = {
          left: rect.right + scrollX + 12,
          top: rect.top + scrollY + rect.height / 2,
          transform: 'translateY(-50%)'
        };
        break;
      case 'left':
        style = {
          left: rect.left + scrollX - 12,
          top: rect.top + scrollY + rect.height / 2,
          transform: 'translate(-100%, -50%)'
        };
        break;
      case 'top':
        style = {
          left: rect.left + scrollX + rect.width / 2,
          top: rect.top + scrollY - 12,
          transform: 'translate(-50%, -100%)'
        };
        break;
      case 'bottom':
        style = {
          left: rect.left + scrollX + rect.width / 2,
          top: rect.bottom + scrollY + 12,
          transform: 'translateX(-50%)'
        };
        break;
    }

    setTooltipStyle(style);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      
      const handleScroll = () => calculatePosition();
      const handleResize = () => calculatePosition();
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const tooltipElement = isVisible ? (
    <div 
      className={`tooltip-popup tooltip-${position}`}
      style={tooltipStyle}
    >
      <div className="tooltip-popup-content">
        {content}
      </div>
      <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>
    </div>
  ) : null;

  return (
    <>
      <div 
        ref={wrapperRef}
        className="tooltip-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {tooltipElement && ReactDOM.createPortal(tooltipElement, document.body)}
    </>
  );
};

export default Tooltip;
