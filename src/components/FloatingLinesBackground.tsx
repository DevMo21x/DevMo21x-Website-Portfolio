import { useEffect, useRef } from "react";

const DESKTOP_LINE_COUNTS = [6, 6, 6] as const;
const MOBILE_LINE_COUNTS = [3, 4, 3] as const;
const LOW_POWER_LINE_COUNTS = [4, 5, 4] as const;

const VERTEX_SHADER = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const createFragmentShader = (precision: "highp" | "mediump") => `
precision ${precision} float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uParallaxOffset;
uniform float uInteraction;
uniform float uAnimationSpeed;
uniform vec3 uGradientA;
uniform vec3 uGradientB;
uniform vec3 uGradientC;
uniform int uTopLineCount;
uniform int uMiddleLineCount;
uniform int uBottomLineCount;

const int MAX_LINES = 6;
const float BEND_RADIUS = 5.0;
const float BEND_STRENGTH = -0.5;

mat2 rotate(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, sine, -sine, cosine);
}

vec3 getLineColor(float t) {
  if (t < 0.5) {
    return mix(uGradientA, uGradientB, t * 2.0) * 0.5;
  }

  return mix(uGradientB, uGradientC, (t - 0.5) * 2.0) * 0.5;
}

float wave(vec2 uv, float offset, float time, float bendOffset) {
  float amplitude = sin(offset + time * 0.2) * 0.3;
  float y = sin(uv.x + offset + time * 0.1) * amplitude + bendOffset;
  float distanceFromLine = uv.y - y;

  return 0.0175 / max(abs(distanceFromLine) + 0.01, 0.001) + 0.01;
}

void main() {
  vec2 baseUv = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;
  baseUv.y *= -1.0;
  baseUv += uParallaxOffset;

  float time = mod(uTime * uAnimationSpeed, 628.3185);
  float logRadius = log(length(baseUv) + 1.0);
  float bendOffset = 0.0;

  if (uInteraction > 0.001) {
    vec2 mouseUv = (2.0 * uMouse - uResolution.xy) / uResolution.y;
    mouseUv.y *= -1.0;
    vec2 delta = baseUv - mouseUv;
    float influence = exp(-dot(delta, delta) * BEND_RADIUS);
    bendOffset = (mouseUv.y - baseUv.y) * influence * BEND_STRENGTH * uInteraction;
  }

  vec3 color = vec3(0.0);

  vec2 bottomUv = baseUv * rotate(-1.0 * logRadius);
  for (int i = 0; i < MAX_LINES; ++i) {
    if (i >= uBottomLineCount) break;
    float line = float(i);
    float t = line / max(float(uBottomLineCount - 1), 1.0);
    color += getLineColor(t) * wave(
      bottomUv + vec2(0.05 * line + 2.0, -0.7),
      1.5 + 0.2 * line,
      time,
      bendOffset
    ) * 0.2;
  }

  vec2 middleUv = baseUv * rotate(0.2 * logRadius);
  for (int i = 0; i < MAX_LINES; ++i) {
    if (i >= uMiddleLineCount) break;
    float line = float(i);
    float t = line / max(float(uMiddleLineCount - 1), 1.0);
    color += getLineColor(t) * wave(
      middleUv + vec2(0.05 * line + 5.0, 0.0),
      2.0 + 0.15 * line,
      time,
      bendOffset
    );
  }

  vec2 topUv = baseUv * rotate(-0.4 * logRadius);
  topUv.x *= -1.0;
  for (int i = 0; i < MAX_LINES; ++i) {
    if (i >= uTopLineCount) break;
    float line = float(i);
    float t = line / max(float(uTopLineCount - 1), 1.0);
    color += getLineColor(t) * wave(
      topUv + vec2(0.05 * line + 10.0, 0.5),
      1.0 + 0.2 * line,
      time,
      bendOffset
    ) * 0.1;
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Floating lines shader failed to compile:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, fragmentPrecision: "highp" | "mediump") {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    createFragmentShader(fragmentPrecision),
  );

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);
    return null;
  }

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("Floating lines program failed to link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value;

  const parsed = Number.parseInt(normalized, 16);
  return [
    ((parsed >> 16) & 255) / 255,
    ((parsed >> 8) & 255) / 255,
    (parsed & 255) / 255,
  ] as const;
}

export default function FloatingLinesBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const mobileQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = mobileQuery.matches;
    const isLowPower =
      isMobile ||
      navigator.hardwareConcurrency <= 4 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    const reducedMotion = reducedMotionQuery.matches;
    const targetFps = reducedMotion ? 0 : isMobile ? 30 : isLowPower ? 45 : 60;
    const frameInterval = targetFps > 0 ? 1000 / targetFps : Number.POSITIVE_INFINITY;
    const pixelRatioCap = isMobile ? 1 : isLowPower ? 1.25 : 1.5;
    const renderPixelBudget = isMobile ? 750_000 : isLowPower ? 1_400_000 : 2_200_000;
    const lineCounts = isMobile
      ? MOBILE_LINE_COUNTS
      : isLowPower
        ? LOW_POWER_LINE_COUNTS
        : DESKTOP_LINE_COUNTS;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      root.dataset.webgl = "unavailable";
      return;
    }

    const precision = isMobile ? "mediump" : "highp";
    const program = createProgram(gl, precision);
    if (!program) {
      root.dataset.webgl = "unavailable";
      return;
    }

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      gl.deleteProgram(program);
      return;
    }

    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "uTime"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      parallaxOffset: gl.getUniformLocation(program, "uParallaxOffset"),
      interaction: gl.getUniformLocation(program, "uInteraction"),
      animationSpeed: gl.getUniformLocation(program, "uAnimationSpeed"),
      gradientA: gl.getUniformLocation(program, "uGradientA"),
      gradientB: gl.getUniformLocation(program, "uGradientB"),
      gradientC: gl.getUniformLocation(program, "uGradientC"),
      topLineCount: gl.getUniformLocation(program, "uTopLineCount"),
      middleLineCount: gl.getUniformLocation(program, "uMiddleLineCount"),
      bottomLineCount: gl.getUniformLocation(program, "uBottomLineCount"),
    };

    const gradientA = hexToRgb("#2f4ba2");
    const gradientB = hexToRgb("#c27aff");
    const gradientC = hexToRgb("#e947f5");

    gl.uniform1f(uniforms.animationSpeed, isMobile ? 0.78 : 0.9);
    gl.uniform3fv(uniforms.gradientA, gradientA);
    gl.uniform3fv(uniforms.gradientB, gradientB);
    gl.uniform3fv(uniforms.gradientC, gradientC);
    gl.uniform1i(uniforms.topLineCount, lineCounts[0]);
    gl.uniform1i(uniforms.middleLineCount, lineCounts[1]);
    gl.uniform1i(uniforms.bottomLineCount, lineCounts[2]);
    gl.uniform2f(uniforms.mouse, -1000, -1000);
    gl.uniform2f(uniforms.parallaxOffset, 0, 0);
    gl.uniform1f(uniforms.interaction, 0);

    let disposed = false;
    let isIntersecting = true;
    let animationFrame = 0;
    let resizeFrame = 0;
    let previousFrameTime = performance.now();
    let elapsedTime = 0;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;
    let targetInfluence = 0;
    let currentInfluence = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const draw = (time: number) => {
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.mouse, currentMouseX, currentMouseY);
      gl.uniform2f(uniforms.parallaxOffset, currentParallaxX, currentParallaxY);
      gl.uniform1f(uniforms.interaction, currentInfluence);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const setSize = () => {
      resizeFrame = 0;
      if (disposed) return;

      const width = Math.max(1, root.clientWidth);
      const height = Math.max(1, root.clientHeight);
      const cappedPixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
      const requestedPixels = width * height * cappedPixelRatio * cappedPixelRatio;
      const pixelBudgetScale = Math.min(1, Math.sqrt(renderPixelBudget / requestedPixels));
      const pixelRatio = cappedPixelRatio * pixelBudgetScale;
      const renderWidth = Math.max(1, Math.round(width * pixelRatio));
      const renderHeight = Math.max(1, Math.round(height * pixelRatio));

      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        gl.viewport(0, 0, renderWidth, renderHeight);
        gl.uniform2f(uniforms.resolution, renderWidth, renderHeight);
      }

      draw(elapsedTime);
    };

    const scheduleResize = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(setSize);
    };

    const shouldAnimate = () =>
      !disposed && !reducedMotion && isIntersecting && !document.hidden;

    const renderLoop = (now: number) => {
      if (!shouldAnimate()) {
        animationFrame = 0;
        return;
      }

      const delta = now - previousFrameTime;
      if (delta >= frameInterval) {
        previousFrameTime = now - (delta % frameInterval);
        elapsedTime += Math.min(delta, 100) / 1000;

        const damping = isMobile ? 0.08 : 0.06;
        currentMouseX += (targetMouseX - currentMouseX) * damping;
        currentMouseY += (targetMouseY - currentMouseY) * damping;
        currentInfluence += (targetInfluence - currentInfluence) * damping;
        currentParallaxX += (targetParallaxX - currentParallaxX) * damping;
        currentParallaxY += (targetParallaxY - currentParallaxY) * damping;

        draw(elapsedTime);
      }

      animationFrame = requestAnimationFrame(renderLoop);
    };

    const syncAnimationState = () => {
      if (shouldAnimate()) {
        if (!animationFrame) {
          previousFrameTime = performance.now();
          animationFrame = requestAnimationFrame(renderLoop);
        }
      } else if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const pixelRatio = canvas.width / Math.max(root.clientWidth, 1);
      targetMouseX = event.clientX * pixelRatio;
      targetMouseY = (window.innerHeight - event.clientY) * pixelRatio;
      targetInfluence = 1;

      targetParallaxX = ((event.clientX / window.innerWidth) - 0.5) * 0.12;
      targetParallaxY = -((event.clientY / window.innerHeight) - 0.5) * 0.12;
    };

    const handlePointerLeave = () => {
      targetInfluence = 0;
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    const handleVisibilityChange = () => syncAnimationState();
    const resizeObserver = new ResizeObserver(scheduleResize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry?.isIntersecting ?? true;
        syncAnimationState();
      },
      { threshold: 0.01 },
    );

    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    window.addEventListener("resize", scheduleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!isMobile && !reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    }

    root.dataset.webgl = "ready";
    setSize();
    syncAnimationState();

    return () => {
      disposed = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", scheduleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 18% 72%, rgba(47, 75, 162, 0.26), transparent 48%), radial-gradient(ellipse at 84% 22%, rgba(194, 122, 255, 0.18), transparent 42%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full [mix-blend-mode:screen]"
      />
    </div>
  );
}
