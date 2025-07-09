import { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import "./ComputerCable.css";

function CableCanvas() {
  const canvasRef = useRef();

  let time = 0;
  useEffect(() => {
    const animate = () => {
      function getQuadraticPoint(t, p0, cp, p1) {
        const x =
          Math.pow(1 - t, 2) * p0.x +
          2 * (1 - t) * t * cp.x +
          Math.pow(t, 2) * p1.x;
        const y =
          Math.pow(1 - t, 2) * p0.y +
          2 * (1 - t) * t * cp.y +
          Math.pow(t, 2) * p1.y;
        return { x, y };
      }
      function drawFlowingDots(p0, cp, p1, time, speed = 0.004, gap = 0.05) {
        for (let i = 0; i <= 1; i += gap) {
          const t = (i + time * speed) % 1;
          const { x, y } = getQuadraticPoint(t, p0, cp, p1);

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      function setupHiDPICanvas(canvas, ctx) {
        const dpr = window.devicePixelRatio || 1;

        // Get the CSS size
        const rect = canvas.getBoundingClientRect();

        // Set the actual canvas size (in pixels)
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Set canvas style size (CSS pixels)
        canvas.style.width = `300px`;
        canvas.style.height = `${rect.height}px`;

        // Scale drawing context to match
        ctx.scale(dpr, dpr);
      }
      setupHiDPICanvas(canvas, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Define the points as {x, y}
      const start = { x: 128, y: 15 };
      const cp1 = { x: 350, y: 100 };
      const end = { x: -100, y: 120 };

      let offset = 0;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(start.x + offset, start.y + offset);
        ctx.quadraticCurveTo(cp1.x, cp1.y, end.x + offset, end.y + offset);
        ctx.lineWidth = 12;
        ctx.strokeStyle = "#b5b39a";
        ctx.lineCap = "square";
        ctx.stroke();

        // Draw main cable body
        ctx.beginPath();
        ctx.moveTo(start.x + offset, start.y + offset);
        ctx.quadraticCurveTo(cp1.x, cp1.y, end.x + offset, end.y + offset);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#DCD8CD";
        ctx.stroke();

        // animate with dots
        // drawFlowingDots(
        //   { x: start.x + offset, y: start.y + offset },
        //   { x: cp1.x, y: cp1.y },
        //   { x: end.x + offset , y: end.y + offset },
        //   time,
        // );

        offset += 5;
      }
      time++;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Box className="cable-container">
      <canvas ref={canvasRef} />
    </Box>
  );
}

export default CableCanvas;
