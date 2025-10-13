"use client"
import { ReactNode, useEffect, useRef, useState } from "react";

type FadeInDirection = 'up' | 'down' | 'left' | 'right';

type FadeOnScrollProps = {
    children?: ReactNode;
    startFade?: number;
    endFade?: number;
}
type FadeInProps = {
    children: ReactNode;
    direction?: FadeInDirection;
    delay?: number,
    duration?: number
}

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};
const useInView = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {setIsInView(entry.isIntersecting);},{ threshold: 0.1, ...options });
    const element = ref.current;
    if (element) observer.observe(element);
    return () => {if (element) observer.unobserve(element);};}, [options]);
  return [ref, isInView];
};


export const FadeOnScroll = ({ children, startFade = 100, endFade = 600 }: FadeOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useScrollPosition();
  const [opacity, setOpacity] = useState(1);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
  }, []);

  useEffect(() => {
    const scrolledPast = scrollY - elementTop;
    
    if (scrolledPast < startFade) {
      setOpacity(1);
    } else if (scrolledPast > endFade) {
      setOpacity(0);
    } else {
      const fadeRange = endFade - startFade;
      const fadeProgress = (scrolledPast - startFade) / fadeRange;
      setOpacity(1 - fadeProgress);
    }
  }, [scrollY, elementTop, startFade, endFade]);

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="transition-opacity duration-100"
    >
      {children}
    </div>
  );
};

export const FadeIn = ({ children, direction = 'up', delay = 0, duration = 0.6 }: FadeInProps) => {
  const [ref, isInView] = useInView();
  
  const directions: Record<FadeInDirection, string> = {
    up: 'translate-y-20',
    down: '-translate-y-20',
    left: 'translate-x-20',
    right: '-translate-x-20'
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${isInView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directions[direction]}`}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};