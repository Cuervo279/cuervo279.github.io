declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pixel-canvas": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        width?: number;
        height?: number;
        pixels?: any[];
      };
    }
  }

  interface HTMLElementTagNameMap {
    "pixel-canvas": PixelCanvas; // Isso informa ao TypeScript que a tag "pixel-canvas" corresponde à classe PixelCanvas.
  }
}

export {};
