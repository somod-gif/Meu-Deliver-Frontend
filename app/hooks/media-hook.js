"use client"
import { useMediaQuery } from 'react-responsive';

export function useIsMobile(breakpoint) {
  const isMobile = useMediaQuery({ maxWidth: breakpoint || 768 });
  return isMobile;
}

export function useIsTablet(breakpoint) {
  const isTablet = useMediaQuery({ maxWidth: breakpoint || 1024 });
  return isTablet;
}
