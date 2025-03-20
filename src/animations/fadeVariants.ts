import { Variants } from 'framer-motion';

// Fade animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: 'easeInOut'
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Fade up animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Fade down animation variants
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Fade left animation variants
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Fade right animation variants
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Pulse animation for interactive elements
export const pulse: Variants = {
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
      ease: 'easeInOut'
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeIn'
    }
  }
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  pulse
};
