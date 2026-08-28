/** Apple WWDC “Designing Fluid Interfaces” momentum projection (px). */
export function project(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Progressive resistance past a boundary — soft stop, not a brick wall. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  if (dimension <= 0) return 0;
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export type SpringOptions = {
  /** Critically damped settle time target (seconds). Apple UI default ~0.3–0.4. */
  response?: number;
  /** 1 = no overshoot; <1 = bounce. Default 1. */
  dampingRatio?: number;
  /** Initial velocity in units/second. */
  velocity?: number;
  /** Rest threshold. */
  restDelta?: number;
  /** Rest velocity threshold (units/s). */
  restSpeed?: number;
};

/**
 * Critically / under-damped spring via rAF. Interruptible: call cancel() and read current.
 * Maps roughly to Apple damping-ratio + response.
 */
export function animateSpring(
  from: number,
  to: number,
  onUpdate: (value: number) => void,
  options: SpringOptions & { onComplete?: () => void } = {}
): { cancel: () => void; get: () => number } {
  const response = options.response ?? 0.35;
  const dampingRatio = options.dampingRatio ?? 1;
  const restDelta = options.restDelta ?? 0.5;
  const restSpeed = options.restSpeed ?? 8;
  const onComplete = options.onComplete;

  // ωn from response ≈ settling time; stiffness = ωn², damping = 2ζωn (mass = 1)
  const omega = (2 * Math.PI) / Math.max(0.05, response);
  const stiffness = omega * omega;
  const damping = 2 * dampingRatio * omega;

  let x = from;
  let v = options.velocity ?? 0;
  let raf = 0;
  let last = performance.now();
  let alive = true;

  const tick = (now: number) => {
    if (!alive) return;
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;

    const springForce = -stiffness * (x - to);
    const damperForce = -damping * v;
    const a = springForce + damperForce;
    v += a * dt;
    x += v * dt;

    onUpdate(x);

    if (Math.abs(x - to) < restDelta && Math.abs(v) < restSpeed) {
      x = to;
      v = 0;
      onUpdate(x);
      alive = false;
      onComplete?.();
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);

  return {
    cancel: () => {
      alive = false;
      cancelAnimationFrame(raf);
    },
    get: () => x,
  };
}

/** Keep a short pointer history for release velocity (px/s). */
export function createVelocityTracker(sampleLimit = 5) {
  const samples: { t: number; x: number }[] = [];

  return {
    reset(x: number) {
      samples.length = 0;
      samples.push({ t: performance.now(), x });
    },
    add(x: number) {
      const t = performance.now();
      samples.push({ t, x });
      if (samples.length > sampleLimit) samples.shift();
    },
    /** px per second along x */
    velocity(): number {
      if (samples.length < 2) return 0;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.t - first.t;
      if (dt <= 0) return 0;
      return ((last.x - first.x) / dt) * 1000;
    },
  };
}
