import { Variants } from 'framer-motion';

// Container variants for staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

// Grid container variants
export const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    transition: { 
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

// List item variants for staggered animations
export const listItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

// Grid item variants
export const gridItem: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  },
  hover: {
    y: -5,
    boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
    transition: {
      duration: 0.3
    }
  }
};

// Staggered text animation for each character
export const textCharacter: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    }
  }
};

export default {
  staggerContainer,
  staggerGrid,
  listItem,
  gridItem,
  textCharacter
};
