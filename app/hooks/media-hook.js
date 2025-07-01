// hooks/useIsMobile.ts
import { useMediaQuery } from 'react-responsive';

export function useIsMobile(breakpoint = 768) {
  const isMobile = useMediaQuery({ maxWidth: breakpoint });
  return isMobile;
}

export function useIsTablet(breakpoint = 1024) {
  const isMobile = useMediaQuery({ maxWidth: breakpoint });
  return isMobile;
}