
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  threshold = 0.1,
  direction = 'up',
  duration = 500,
  once = true,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const getDirectionStyles = () => {
    const baseStyles = {
      opacity: 0,
      transform: 'none',
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
      transitionDelay: `${delay}ms`,
    };

    switch (direction) {
      case 'up':
        return {
          ...baseStyles,
          transform: 'translateY(30px)',
        };
      case 'down':
        return {
          ...baseStyles,
          transform: 'translateY(-30px)',
        };
      case 'left':
        return {
          ...baseStyles,
          transform: 'translateX(30px)',
        };
      case 'right':
        return {
          ...baseStyles,
          transform: 'translateX(-30px)',
        };
      case 'none':
        return {
          ...baseStyles,
        };
      default:
        return baseStyles;
    }
  };

  const visibleStyles = {
    opacity: 1,
    transform: 'none',
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        ...getDirectionStyles(),
        ...(isVisible ? visibleStyles : {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
