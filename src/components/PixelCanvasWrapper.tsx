// import { useEffect, useRef } from "react";

// interface PixelCanvasWrapperProps {
//   gap?: number;
//   speed?: number;
//   colors?: string;
//   noFocus?: boolean;
// }

// export default function PixelCanvasWrapper({
//   gap = 5,
//   speed = 35,
//   colors = "#f8fafc, #f1f5f9, #cbd5e1",
//   noFocus = false,
// }: PixelCanvasWrapperProps) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.setAttribute("data-gap", gap.toString());
//       ref.current.setAttribute("data-speed", speed.toString());
//       ref.current.setAttribute("data-colors", colors);
//       if (noFocus) {
//         ref.current.setAttribute("data-no-focus", "");
//       } else {
//         ref.current.removeAttribute("data-no-focus");
//       }
//     }
//   }, [gap, speed, colors, noFocus]);

//   return <pixel-canvas ref={ref}></pixel-canvas>;
// }

import { useEffect, useRef } from "react";
import "./PixelCanvas.ts";

interface PixelCanvasWrapperProps {
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
}

export default function PixelCanvasWrapper({
  gap = 5,
  speed = 35,
  colors = "#f8fafc, #f1f5f9, #cbd5e1",
  noFocus = false,
}: PixelCanvasWrapperProps) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-gap", gap.toString());
      ref.current.setAttribute("data-speed", speed.toString());
      ref.current.setAttribute("data-colors", colors);
      if (noFocus) {
        ref.current.setAttribute("data-no-focus", "");
      } else {
        ref.current.removeAttribute("data-no-focus");
      }
    }
  }, [gap, speed, colors, noFocus]);

  return <pixel-canvas ref={ref} />; //style={{ display: "block", width: "100%", height: "500px" }}
}
