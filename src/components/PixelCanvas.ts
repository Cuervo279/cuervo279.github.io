class Pixel {
    private width: number;
    private height: number;
    private ctx: CanvasRenderingContext2D;
    private speed: number;
    private size: number = 0;
    private sizeStep: number;
    private minSize: number = 0.5;
    private maxSizeInteger: number = 2;
    private maxSize: number;
    private counter: number = 0;
    private counterStep: number;
    private isIdle: boolean = false;
    private isReverse: boolean = false;
    private isShimmer: boolean = false;
  
    constructor(
      private canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      private x: number,
      private y: number,
      private color: string,
      baseSpeed: number,
      private delay: number
    ) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = context;
      this.speed = this.getRandomValue(0.1, 0.9) * baseSpeed;
      this.sizeStep = Math.random() * 0.4;
      this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
      this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    }
  
    private getRandomValue(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }
  
    private draw(): void {
      const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
  
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }
  
    appear(): void {
      this.isIdle = false;
  
      if (this.counter <= this.delay) {
        this.counter += this.counterStep;
        return;
      }
  
      if (this.size >= this.maxSize) {
        this.isShimmer = true;
      }
  
      if (this.isShimmer) {
        this.shimmer();
      } else {
        this.size += this.sizeStep;
      }
  
      this.draw();
    }
  
    disappear(): void {
      this.isShimmer = false;
      this.counter = 0;
  
      if (this.size <= 0) {
        this.isIdle = true;
        return;
      } else {
        this.size -= 0.1;
      }
  
      this.draw();
    }
  
    private shimmer(): void {
      if (this.size >= this.maxSize) {
        this.isReverse = true;
      } else if (this.size <= this.minSize) {
        this.isReverse = false;
      }
  
      this.size += this.isReverse ? -this.speed : this.speed;
    }
  
    get idle(): boolean {
      return this.isIdle;
    }
  }
  
  class PixelCanvas extends HTMLElement {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private pixels: Pixel[] = [];
    private animation!: number;
    private resizeObserver!: ResizeObserver;
    private timeInterval: number = 1000 / 60;
    private timePrevious: number = performance.now();
    private reducedMotion: boolean = false;
    private _parent!: HTMLElement;

    private boundMouseEnter = this.handleMouseEnter.bind(this);
    private boundMouseLeave = this.handleMouseLeave.bind(this);
  
    static register(tag = "pixel-canvas") {
      if ("customElements" in window) {
        customElements.define(tag, this);
      }
    }
  
    static css = `
      :host {
        display: grid;
        inline-size: 100%;
        block-size: 100%;
        overflow: hidden;
      }
    `;
  
    get colors(): string[] {
      return this.dataset.colors?.split(",") ?? ["#f8fafc", "#f1f5f9", "#cbd5e1"];
    }
  
    get gap(): number {
      const value = parseInt(this.dataset.gap ?? "5");
      return Math.max(4, Math.min(50, value));
    }
  
    get speed(): number {
      const value = parseInt(this.dataset.speed ?? "35");
      const throttle = 0.001;
  
      if (value <= 0 || this.reducedMotion) return 0;
      if (value >= 100) return 100 * throttle;
  
      return value * throttle;
    }
  
    get noFocus(): boolean {
      return this.hasAttribute("data-no-focus");
    }
  
    connectedCallback(): void {
      const canvas = document.createElement("canvas");
      const sheet = new CSSStyleSheet();
  
      this._parent = this.parentElement!;
      this.shadowRoot?.replaceChildren(); // reset if re-attached
  
      this.attachShadow({ mode: "open" });
      sheet.replaceSync(PixelCanvas.css);
      this.shadowRoot!.adoptedStyleSheets = [sheet];
      this.shadowRoot!.appendChild(canvas);
  
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d")!;
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
      this.init();
      this.resizeObserver = new ResizeObserver(() => this.init());
      this.resizeObserver.observe(this);
      //this.resizeObserver.observe(this.canvas);
  
      this._parent.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
      this._parent.addEventListener("mouseleave", this);
      if (!this.noFocus) {
        this._parent.addEventListener("focusin", this);
        this._parent.addEventListener("focusout", this);
      }

      this.handleAnimation("appear")
    }
  
    disconnectedCallback(): void {
      this.resizeObserver.disconnect();
      this._parent.removeEventListener("mouseenter", this.handleMouseEnter.bind(this));
      this._parent.removeEventListener("mouseleave", this);
  
      if (!this.noFocus) {
        this._parent.removeEventListener("focusin", this);
        this._parent.removeEventListener("focusout", this);
      }
    }
  
    handleEvent(event: Event): void {
      (this[`on${event.type}` as keyof this] as ((event: Event) => void) | undefined)?.(event);
    }
  
    handleMouseEnter(): void {
      this.init();
      console.log("Mouse Enter");
      this.handleAnimation("appear");
    }
  
    handleMouseLeave(): void {
      console.log("Mouse Enter");
      this.handleAnimation("disappear");
    }
  
    onfocusin(e: FocusEvent): void {
      if (e.currentTarget instanceof HTMLElement && e.currentTarget.contains(e.relatedTarget as Node)) return;
      this.handleAnimation("appear");
    }
  
    onfocusout(e: FocusEvent): void {
      if (e.currentTarget instanceof HTMLElement && e.currentTarget.contains(e.relatedTarget as Node)) return;
      this.handleAnimation("disappear");
    }
  
    private handleAnimation(name: "appear" | "disappear"): void {
      cancelAnimationFrame(this.animation);
      this.animation = this.runAnimation(name);
    }
  
    private init(): void {
      //(this as HTMLElement).style.width = "150px";

      const rect = this.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
  
      this.pixels = [];
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
  
      this.createPixels();
    }
  
    private getDistanceToCanvasCenter(x: number, y: number): number {
      const dx = x - this.canvas.width / 2;
      const dy = y - this.canvas.height / 2;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    private createPixels(): void {
      for (let x = 0; x < this.canvas.width; x += this.gap) {
        for (let y = 0; y < this.canvas.height; y += this.gap) {
          const color = this.colors[Math.floor(Math.random() * this.colors.length)];
          const delay = this.reducedMotion ? 0 : this.getDistanceToCanvasCenter(x, y);
  
          this.pixels.push(new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay));
        }
      }
    }
  
    public runAnimation(fnName: "appear" | "disappear"): number {
      return requestAnimationFrame(() => {
        this.animation = this.runAnimation(fnName);
  
        const timeNow = performance.now();
        const timePassed = timeNow - this.timePrevious;
  
        if (timePassed < this.timeInterval) return;
  
        this.timePrevious = timeNow - (timePassed % this.timeInterval);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        for (const pixel of this.pixels) {
          (pixel as any)[fnName]();
        }
  
        if (this.pixels.every((pixel) => (pixel as any).idle)) {
          cancelAnimationFrame(this.animation);
        }
      });
    }
  }
  
  PixelCanvas.register();
  export { PixelCanvas };
  