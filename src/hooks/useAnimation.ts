import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useAnimation = (once = true) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return { ref, isInView };
};
