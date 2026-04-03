import { useEffect, useRef } from 'react';
import { useMood } from '@/hooks/useMood';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const { currentMood } = useMood();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on mood
    const particleCount = currentMood.particleEffect === 'stars' ? 100 : 50;
    particlesRef.current = [];

    const createParticle = (): Particle => {
      const effect = currentMood.particleEffect;
      
      let speedX = 0;
      let speedY = 0;
      let size = Math.random() * 3 + 1;

      switch (effect) {
        case 'bubbles':
          speedX = (Math.random() - 0.5) * 0.5;
          speedY = -Math.random() * 1 - 0.5;
          break;
        case 'sparks':
          speedX = (Math.random() - 0.5) * 3;
          speedY = (Math.random() - 0.5) * 3;
          size = Math.random() * 2 + 0.5;
          break;
        case 'particles':
          speedX = (Math.random() - 0.5) * 1;
          speedY = (Math.random() - 0.5) * 1;
          break;
        case 'embers':
          speedX = (Math.random() - 0.5) * 1;
          speedY = -Math.random() * 2 - 0.5;
          size = Math.random() * 4 + 2;
          break;
        case 'stars':
          speedX = (Math.random() - 0.5) * 0.3;
          speedY = (Math.random() - 0.5) * 0.3;
          size = Math.random() * 2 + 0.5;
          break;
        case 'rain':
          speedX = (Math.random() - 0.5) * 0.5;
          speedY = Math.random() * 8 + 5;
          size = Math.random() * 2 + 1;
          break;
        default:
          speedX = (Math.random() - 0.5) * 0.5;
          speedY = (Math.random() - 0.5) * 0.5;
      }

      return {
        x: Math.random() * canvas.width,
        y: effect === 'bubbles' || effect === 'embers' ? canvas.height + 10 : Math.random() * canvas.height,
        size,
        speedX,
        speedY,
        opacity: Math.random() * 0.5 + 0.3,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life++;

        // Reset particle if out of bounds or expired
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height ||
          particle.life > particle.maxLife
        ) {
          particlesRef.current[index] = createParticle();
        }

        // Draw particle
        const lifeRatio = 1 - particle.life / particle.maxLife;
        const opacity = particle.opacity * lifeRatio;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${currentMood.colors.accent}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Add glow effect for certain moods
        if (currentMood.particleEffect === 'stars' || currentMood.particleEffect === 'embers') {
          ctx.shadowBlur = 10;
          ctx.shadowColor = currentMood.colors.accent;
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentMood]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};
