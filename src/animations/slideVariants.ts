import { Variants } from 'framer-motion';

// Slide up animation variants
export const slideUp: Variants = {
  hidden: { 
    y: 100,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  },
  exit: { 
    y: 100,
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Slide down animation variants
export const slideDown: Variants = {
  hidden: { 
    y: -100,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  },
  exit: { 
    y: -100,
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Slide left animation variants
export const slideLeft: Variants = {
  hidden: { 
    x: 100,
    opacity: 0 
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  },
  exit: { 
    x: 100,
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Slide right animation variants
export const slideRight: Variants = {
  hidden: { 
    x: -100,
    opacity: 0 
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  },
  exit: { 
    x: -100,
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Animated card flip
export const flip: Variants = {
  hidden: { 
    rotateY: 90,
    opacity: 0 
  },
  visible: { 
    rotateY: 0,
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    rotateY: 90,
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// 3D rotate for cards
export const rotate3d: Variants = {
  hover: {
    rotateY: 15,
    rotateX: 5,
    transition: { 
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  tap: {
    rotateY: 0,
    rotateX: 0,
    scale: 0.95,
    transition: { 
      duration: 0.15,
      ease: 'easeIn'
    }
  }
};

export default {
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  flip,
  rotate3d
};
