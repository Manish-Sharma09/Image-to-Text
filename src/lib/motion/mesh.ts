// The hero's mesh gradient: one full-screen quad and a fragment shader that
// blends the DESIGN.md stops (cyan → blue → violet → magenta → amber) through
// domain-warped noise. A soft band sweeps down it like the reader's scan line;
// `energy` rises while the workspace is reading. Rendered at reduced
// resolution (the gradient is smooth), driven by GSAP's ticker, paused when
// off screen or in a hidden tab, and drawn once when motion is reduced.
import { Mesh, NoBlending, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from 'three';
import { gsap } from './gsap';

const STOPS = ['#00dfd8', '#007cf0', '#7928ca', '#ff0080', '#f9cb28'];

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uPointer;
  uniform float uEnergy;
  uniform float uScan;
  uniform float uAlpha;
  uniform float uDark;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;

  // 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT).
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  vec3 palette(float x) {
    x = clamp(x, 0.0, 1.0) * 4.0;
    vec3 c = mix(uC0, uC1, smoothstep(0.0, 1.0, x));
    c = mix(c, uC2, smoothstep(1.0, 2.0, x));
    c = mix(c, uC3, smoothstep(2.0, 3.0, x));
    return mix(c, uC4, smoothstep(3.0, 4.0, x));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    float t = uTime * (0.045 + 0.09 * uEnergy);

    // The bloom leans gently toward the pointer.
    vec2 m = vec2((uPointer.x - 0.5) * aspect, uPointer.y - 0.5);
    p -= (p - m) * 0.08 * exp(-dot(p - m, p - m) * 1.5);

    vec2 q = vec2(snoise(vec3(p * 0.65, t)), snoise(vec3(p * 0.65 + 3.1, t + 7.0)));
    vec2 r = p + q * (0.42 + 0.22 * uEnergy);

    float idx = uv.x + 0.24 * snoise(vec3(r * 0.85, t * 1.3 + 11.0));
    vec3 col = palette(idx);

    float n = snoise(vec3(r * 1.05, t * 0.8 + 3.0)) * 0.5 + 0.5;
    float band = exp(-pow((uv.y - 0.5) / 0.3, 2.0));
    float d = smoothstep(0.08, 0.78, n) * band;

    // Scan line: uScan runs 0 (top) → 1 (bottom); a bright edge with a short wake.
    float sy = 1.0 - uScan;
    float edge = exp(-pow((uv.y - sy) * 26.0, 2.0));
    float wake = smoothstep(sy, sy + 0.18, uv.y) * (1.0 - smoothstep(sy + 0.18, sy + 0.4, uv.y));
    float env = smoothstep(-0.05, 0.08, uScan) * (1.0 - smoothstep(0.88, 1.05, uScan));
    float sweep = (edge + wake * 0.35) * env;
    d += sweep * 0.55 * (0.35 + band);
    col = mix(col, mix(vec3(1.0), col * 1.4, uDark), edge * 0.35);

    float a = clamp(d * uAlpha * (0.9 + 0.35 * uEnergy), 0.0, 1.0);
    // Dither so 8-bit output doesn't band.
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
    a = clamp(a + g * (1.5 / 255.0), 0.0, 1.0);
    gl_FragColor = vec4(col * a, a);
  }
`;

const toVec3 = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

export interface MeshControls {
  /** 0 = resting, 1 = reading. */
  energy(value: number, duration?: number): void;
  /** Sweep the scan band once from top to bottom. */
  scan(duration?: number, onDone?: () => void): void;
  destroy(): void;
}

export function mountMesh(host: HTMLElement, canvas: HTMLCanvasElement, { animate = true } = {}): MeshControls | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);

  const uniforms = {
    uTime: { value: 8 },
    uRes: { value: new Vector2(1, 1) },
    uPointer: { value: new Vector2(0.5, 0.4) },
    uEnergy: { value: 0 },
    uScan: { value: -1 },
    uAlpha: { value: 0.6 },
    uDark: { value: 0 },
    uC0: { value: toVec3(STOPS[0]) },
    uC1: { value: toVec3(STOPS[1]) },
    uC2: { value: toVec3(STOPS[2]) },
    uC3: { value: toVec3(STOPS[3]) },
    uC4: { value: toVec3(STOPS[4]) },
  };
  // The shader already outputs premultiplied colour onto a cleared, transparent
  // canvas, so write it straight through rather than blending it again.
  const material = new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, blending: NoBlending, depthTest: false, depthWrite: false });
  const geometry = new PlaneGeometry(2, 2);
  const scene = new Scene();
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const render = () => renderer.render(scene, camera);

  const applyTheme = () => {
    const dark = getComputedStyle(document.documentElement).colorScheme.includes('dark');
    uniforms.uDark.value = dark ? 1 : 0;
    uniforms.uAlpha.value = dark ? 0.55 : 0.62;
    if (!running) render();
  };

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    // The gradient is smooth, so half resolution is plenty and much cheaper.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2) * 0.5);
    renderer.setSize(width, height, false);
    uniforms.uRes.value.set(width, height);
    if (!running) render();
  };

  // Pointer target in mesh space (0..1, y up), eased toward each frame.
  const target = new Vector2(0.5, 0.4);
  const onPointer = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
  };

  let running = false;
  let visible = true;
  const tick = (_time: number, delta: number) => {
    uniforms.uTime.value += Math.min(delta, 50) / 1000;
    uniforms.uPointer.value.lerp(target, 0.04);
    render();
  };
  const update = () => {
    const should = animate && visible && !document.hidden;
    if (should === running) return;
    running = should;
    if (running) gsap.ticker.add(tick);
    else gsap.ticker.remove(tick);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  io.observe(host);
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const scheme = matchMedia('(prefers-color-scheme: dark)');
  const mo = new MutationObserver(applyTheme);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  scheme.addEventListener('change', applyTheme);
  document.addEventListener('visibilitychange', update);
  if (animate) window.addEventListener('pointermove', onPointer, { passive: true });

  const onLost = (e: Event) => {
    e.preventDefault();
    host.dataset.mesh = 'lost';
  };
  canvas.addEventListener('webglcontextlost', onLost);

  resize();
  applyTheme();
  render();
  update();

  let scanTween: gsap.core.Tween | undefined;
  let afterScan: (() => void)[] = [];
  return {
    energy(value, duration = 1.2) {
      if (!animate) return;
      gsap.to(uniforms.uEnergy, { value, duration, ease: 'power2.inOut', overwrite: true });
    },
    scan(duration = 2.4, onDone) {
      if (!animate) return;
      if (onDone) afterScan.push(onDone);
      if (scanTween?.isActive()) return; // Callers waiting on a sweep share the one in flight.
      scanTween = gsap.fromTo(
        uniforms.uScan,
        { value: -0.05 },
        {
          value: 1.05,
          duration,
          ease: 'power1.inOut',
          onComplete: () => {
            uniforms.uScan.value = -1;
            const done = afterScan;
            afterScan = [];
            done.forEach((fn) => fn());
          },
        },
      );
    },
    destroy() {
      running = false;
      scanTween?.kill();
      afterScan = [];
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      scheme.removeEventListener('change', applyTheme);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('webglcontextlost', onLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
