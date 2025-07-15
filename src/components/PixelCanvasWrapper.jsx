import { useEffect, useRef } from "react";
import "./PixelCanvas";

function PixelCanvasWrapper({
  gap = 5,
  speed = 35,
  colors = "#f8fafc, #f1f5f9, #cbd5e1",
  noFocus = false,
  className = ""
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.dataset.gap = gap.toString();
    canvas.dataset.speed = speed.toString();
    canvas.dataset.colors = colors;
    
    if (noFocus) {
      canvas.setAttribute("data-no-focus", "");
    } else {
      canvas.removeAttribute("data-no-focus");
    }
  }, [gap, speed, colors, noFocus]);

  return <pixel-canvas ref={canvasRef} className={className} />;
}

export default PixelCanvasWrapper;