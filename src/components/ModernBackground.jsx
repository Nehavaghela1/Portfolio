import React, { useEffect, useRef } from 'react';

const ModernBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const isMobile = width < 768;
    const numStars = isMobile ? 80 : 250;

    // Generate random stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        // Diagonal flow: upwards and rightwards
        vy: -(Math.random() * 0.5 + 0.1), 
        vx: (Math.random() * 0.3 + 0.05),
        opacity: Math.random(),
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        color: Math.random() > 0.9 ? 'rgba(0, 242, 254,' : 'rgba(255, 255, 255,' // Occasional teal star
      });
    }

    // Add a couple of fast shooting stars
    const shootingStars = [];
    for (let i = 0; i < 3; i++) {
        shootingStars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 80 + 30,
            speed: Math.random() * 10 + 5,
            opacity: 0,
            active: false
        });
    }

    let animationFrameId;

    const animate = () => {
      // Pure absolute black space background
      ctx.fillStyle = '#000000'; 
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      stars.forEach(star => {
        // Move star
        star.y += star.vy;
        star.x += star.vx;

        // Twinkle effect
        star.opacity += 0.01 * star.fadeDir;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.fadeDir = -1;
        } else if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.fadeDir = 1;
        }

        // Screen wrap
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        if (star.x < 0) {
          star.x = width;
          star.y = Math.random() * height;
        }

        // Render star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${star.opacity})`;
        ctx.shadowBlur = star.radius * 3;
        ctx.shadowColor = star.color === 'rgba(255, 255, 255,' ? '#ffffff' : '#00f2fe';
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -5,
        pointerEvents: 'none',
        background: '#020617'
      }}
    />
  );
};

export default ModernBackground;
