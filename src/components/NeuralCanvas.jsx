import React, { useEffect, useRef } from 'react';

const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse position tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Neural Nodes setup
    const NODE_COUNT = Math.min(Math.floor((width * height) / 11000), 110);
    const nodes = [];

    const colors = [
      { r: 56, g: 189, b: 248 },  // Soft Sky Blue
      { r: 99, g: 102, b: 241 },  // Indigo
      { r: 20, g: 184, b: 166 }   // Teal
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5, // 3D depth perception
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: color,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw faint background ambient glow behind neural network
      const bgGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
      bgGlow.addColorStop(0, 'rgba(0, 243, 255, 0.03)');
      bgGlow.addColorStop(0.5, 'rgba(157, 0, 255, 0.02)');
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes with depth scaling
        node.x += node.vx * node.z;
        node.y += node.vy * node.z;

        // Bounce off canvas bounds
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Pulse size
        node.pulse += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        // Mouse Proximity Attraction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= (dx / dist) * force * 1.5;
          node.y -= (dy / dist) * force * 1.5;

          // Draw connection from mouse to node
          if (dist < mouse.radius * 0.8) {
            const mouseAlpha = (1 - dist / (mouse.radius * 0.8)) * 0.5;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${mouseAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw connections (Synapses)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);
          const maxDist = 130;

          if (nDist < maxDist) {
            const alpha = (1 - nDist / maxDist) * 0.35 * (node.z / 2);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${alpha})`;
            ctx.lineWidth = (1.2 - nDist / maxDist) * node.z;
            ctx.stroke();

            // Synapse Signal Animation (Pulse along line)
            if (Math.random() < 0.005) {
              const signalProgress = (Date.now() % 2000) / 2000;
              const sx = node.x + ndx * signalProgress;
              const sy = node.y + ndy * signalProgress;
              ctx.beginPath();
              ctx.arc(sx, sy, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 243, 255, 0.9)`;
              ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }

        // Draw node particle
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.5, currentRadius * node.z), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${0.85 * (node.z / 2.5)})`;
        ctx.shadowColor = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.8)`;
        ctx.shadowBlur = 12 * node.z;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
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
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default NeuralCanvas;
