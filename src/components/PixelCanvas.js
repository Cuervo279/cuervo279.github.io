class Pixel {
    constructor(
      canvas, 
      context, 
      x, 
      y, 
      color, 
      baseSpeed, 
      delay
    ) {
      this.canvas = canvas
      this.ctx = context
      this.x = x
      this.y = y
      this.color = color
      this.delay = delay
      
      this.width = canvas.width
      this.height = canvas.height
      this.speed = this.#getRandomValue(0.1, 0.9) * baseSpeed
      this.size = 0
      this.sizeStep = Math.random() * 0.4
      this.minSize = 0.5
      this.maxSizeInteger = 2
      this.maxSize = this.#getRandomValue(this.minSize, this.maxSizeInteger)
      this.counter = 0
      this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
      this.isIdle = false
      this.isReverse = false
      this.isShimmer = false
    }
  
    #getRandomValue(min, max) {
      return Math.random() * (max - min) + min
    }
  
    #draw() {
      const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(
        this.x + centerOffset, 
        this.y + centerOffset, 
        this.size, 
        this.size
      )
    }
  
    appear() {
      this.isIdle = false
  
      if (this.counter <= this.delay) {
        this.counter += this.counterStep
        return
      }
  
      if (this.size >= this.maxSize) {
        this.isShimmer = true
      }
  
      this.isShimmer ? this.#shimmer() : this.size += this.sizeStep
      this.#draw()
    }
  
    disappear() {
      this.isShimmer = false
      this.counter = 0
  
      if (this.size <= 0) {
        this.isIdle = true
      } else {
        this.size -= 0.1
      }
  
      this.#draw()
    }
  
    #shimmer() {
      if (this.size >= this.maxSize) {
        this.isReverse = true
      } else if (this.size <= this.minSize) {
        this.isReverse = false
      }
  
      this.size += this.isReverse ? -this.speed : this.speed
    }
  
    get idle() {
      return this.isIdle
    }
  }
  
  class PixelCanvas extends HTMLElement {
    static css = `
      :host {
        display: grid;
        inline-size: 100%;
        block-size: 100%;
        overflow: hidden;
      }
    `
  
    static register(tag = "pixel-canvas") {
      if ("customElements" in window) {
        customElements.define(tag, this)
      }
    }
  
    constructor() {
      super()
      this.boundMouseEnter = this.handleMouseEnter.bind(this)
      this.boundMouseLeave = this.handleMouseLeave.bind(this)
      this.timeInterval = 1000 / 60
    }
  
    get colors() {
      return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"]
    }
  
    get gap() {
      const value = parseInt(this.dataset.gap || "5")
      return Math.max(4, Math.min(50, value))
    }
  
    get speed() {
      const value = parseInt(this.dataset.speed || "35")
      const throttle = 0.001
  
      if (value <= 0 || this.reducedMotion) return 0
      if (value >= 100) return 100 * throttle
  
      return value * throttle
    }
  
    get noFocus() {
      return this.hasAttribute("data-no-focus")
    }
  
    connectedCallback() {
      this.canvas = document.createElement("canvas")
      const sheet = new CSSStyleSheet()
  
      this._parent = this.parentElement
      this.shadowRoot?.replaceChildren()
  
      this.attachShadow({ mode: "open" })
      sheet.replaceSync(PixelCanvas.css)
      this.shadowRoot.adoptedStyleSheets = [sheet]
      this.shadowRoot.appendChild(this.canvas)
  
      this.ctx = this.canvas.getContext("2d")
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  
      this.init()
      this.resizeObserver = new ResizeObserver(() => this.init())
      this.resizeObserver.observe(this)
  
      this._parent.addEventListener("mouseenter", this.boundMouseEnter)
      this._parent.addEventListener("mouseleave", this)
      
      if (!this.noFocus) {
        this._parent.addEventListener("focusin", this)
        this._parent.addEventListener("focusout", this)
      }
  
      this.handleAnimation("appear")
    }
  
    disconnectedCallback() {
      this.resizeObserver.disconnect()
      this._parent.removeEventListener("mouseenter", this.boundMouseEnter)
      this._parent.removeEventListener("mouseleave", this)
  
      if (!this.noFocus) {
        this._parent.removeEventListener("focusin", this)
        this._parent.removeEventListener("focusout", this)
      }
    }
  
    handleEvent(event) {
      this[`on${event.type}`]?.(event)
    }
  
    handleMouseEnter() {
      this.init()
      this.handleAnimation("appear")
    }
  
    handleMouseLeave() {
      this.handleAnimation("disappear")
    }
  
    onfocusin(e) {
      if (e.currentTarget.contains(e.relatedTarget)) return
      this.handleAnimation("appear")
    }
  
    onfocusout(e) {
      if (e.currentTarget.contains(e.relatedTarget)) return
      this.handleAnimation("disappear")
    }
  
    handleAnimation(name) {
      cancelAnimationFrame(this.animation)
      this.animation = this.runAnimation(name)
    }
  
    init() {
      const rect = this.getBoundingClientRect()
      const width = Math.floor(rect.width)
      const height = Math.floor(rect.height)
  
      this.pixels = []
      this.canvas.width = width
      this.canvas.height = height
      this.canvas.style.width = `${width}px`
      this.canvas.style.height = `${height}px`
  
      this.createPixels()
    }
  
    #getDistanceToCanvasCenter(x, y) {
      const dx = x - this.canvas.width / 2
      const dy = y - this.canvas.height / 2
      return Math.sqrt(dx * dx + dy * dy)
    }
  
    createPixels() {
      for (let x = 0; x < this.canvas.width; x += this.gap) {
        for (let y = 0; y < this.canvas.height; y += this.gap) {
          const color = this.colors[Math.floor(Math.random() * this.colors.length)]
          const delay = this.reducedMotion ? 0 : this.#getDistanceToCanvasCenter(x, y)
  
          this.pixels.push(
            new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
          )
        }
      }
    }
  
    runAnimation(fnName) {
      return requestAnimationFrame(() => {
        this.animation = this.runAnimation(fnName)
  
        const timeNow = performance.now()
        const timePassed = timeNow - this.timePrevious
  
        if (timePassed < this.timeInterval) return
  
        this.timePrevious = timeNow - (timePassed % this.timeInterval)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
        this.pixels.forEach(pixel => pixel[fnName]())
  
        if (this.pixels.every(pixel => pixel.idle)) {
          cancelAnimationFrame(this.animation)
        }
      })
    }
  }
  
  PixelCanvas.register()