declare module "gsap/ScrollSmoother" {
  export interface ScrollSmootherConfig {
    smooth?: number;
    effects?: boolean;
    smoothTouch?: boolean | number;
    normalizeScroll?: boolean;
    ignoreMobileResize?: boolean;
    preventDefault?: boolean;
    wrapper?: string | Element;
    content?: string | Element;
    onUpdate?: (self: ScrollSmoother) => void;
    onRefresh?: (self: ScrollSmoother) => void;
    onStop?: (self: ScrollSmoother) => void;
  }

  export interface ScrollSmootherVars {
    offset?: number;
    duration?: number;
    ease?: string;
  }

  export class ScrollSmoother {
    constructor(config: ScrollSmootherConfig);

    static create(config: ScrollSmootherConfig): ScrollSmoother;
    static get(): ScrollSmoother | null;

    scrollTop(value?: number): number;
    scrollTo(
      target: number | string | Element,
      smooth?: boolean | ScrollSmootherVars,
      position?: string
    ): void;
    offset(element: Element | string, position?: string): number;
    content(element?: Element): Element;
    wrapper(element?: Element): Element;
    effects(element: Element | string, speed: number, lag?: number): void;
    smooth(value?: number): number;
    kill(): void;
    refresh(): void;
    paused(value?: boolean): boolean;

    // Properties
    progress: number;
    velocity: number;
  }

  export default ScrollSmoother;
}

declare module "gsap/ScrollTrigger" {
  export interface ScrollTriggerConfig {
    trigger?: string | Element;
    start?: string | number;
    end?: string | number;
    scrub?: boolean | number;
    pin?: boolean | string | Element;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
    onUpdate?: (self: ScrollTrigger) => void;
    [key: string]: unknown;
  }

  export class ScrollTrigger {
    static create(config: ScrollTriggerConfig): ScrollTrigger;
    static refresh(): void;
    static update(): void;
    static getAll(): ScrollTrigger[];
    static getById(id: string): ScrollTrigger;
    static addEventListener(
      type: string,
      callback: (event: Event) => void
    ): void;
    static removeEventListener(
      type: string,
      callback: (event: Event) => void
    ): void;
    kill(): void;

    // Instance properties
    direction: number;
    progress: number;
  }
  export default ScrollTrigger;
}
