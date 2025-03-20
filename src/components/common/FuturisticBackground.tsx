import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface FuturisticBackgroundProps {
  particleCount?: number;
  speed?: number;
  primaryColor?: string;
  secondaryColor?: string;
  opacity?: number;
}

const FuturisticBackground: React.FC<FuturisticBackgroundProps> = ({
  particleCount = 100,
  speed = 1,
  primaryColor,
  secondaryColor,
  opacity = 0.6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();

  // Use theme colors if no custom colors are provided
  const primary = primaryColor || theme.palette.primary.main;
  const secondary = secondaryColor || theme.palette.secondary.main;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        color: Math.random() > 0.5 ? primary : secondary,
      });
    }

    // Animation variables
    let animationFrame: number;
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Draw function
    const draw = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, theme.palette.mode === 'dark' ? '#111' : '#f5f5f5');
      gradient.addColorStop(1, theme.palette.mode === 'dark' ? '#121212' : '#ffffff');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (const particle of particles) {
        // Add subtle attraction to mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          particle.vx += (dx / dist) * 0.02;
          particle.vy += (dy / dist) * 0.02;
        }
        
        // Apply velocity limits
        particle.vx = Math.max(-1, Math.min(1, particle.vx));
        particle.vy = Math.max(-1, Math.min(1, particle.vy));
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity * (particle.size / 6);
        ctx.fill();

        // Connect nearby particles with lines
        for (const otherParticle of particles) {
          if (particle === otherParticle) continue;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = opacity * (1 - distance / 150);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', (e) => {});
      cancelAnimationFrame(animationFrame);
    };
  }, [particleCount, speed, primary, secondary, opacity, theme]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default FuturisticBackground;