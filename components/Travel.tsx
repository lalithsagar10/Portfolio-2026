"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import {
  animateSpring,
  createVelocityTracker,
  project,
  rubberband,
} from "@/lib/fluid";
import { travelMoments } from "@/lib/content";
import { videoMimeType } from "@/lib/videoMimeType";

const frameAspect = "aspect-[2/1]";
const GAP_PX = 14;
const SLIDE_WIDTH_RATIO = 0.88;
/** px of movement before committing to a horizontal drag (hysteresis). */
const DRAG_THRESHOLD = 10;
const DECELERATION = 0.998;

export function Travel() {
  const count = travelMoments.length;
  const [index, setIndex] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const xRef = useRef(0);
  const indexRef = useRef(index);
  const springRef = useRef<{ cancel: () => void; get: () => number } | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    dragging: boolean;
    /** null = undecided, true = horizontal, false = vertical (abort) */
    axisLocked: boolean | null;
  } | null>(null);
  const velocity = useRef(createVelocityTracker());
  const wheelSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  indexRef.current = index;

  const slideW = viewportW > 0 ? viewportW * SLIDE_WIDTH_RATIO : 0;
  const step = slideW + GAP_PX;
  const minX = count > 1 && step > 0 ? -((count - 1) * step) : 0;
  const maxX = 0;

  const applyX = useCallback((x: number) => {
    xRef.current = x;
    const track = trackRef.current;
    if (track) {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  }, []);

  const clampIndex = useCallback(
    (i: number) => Math.max(0, Math.min(count - 1, i)),
    [count]
  );

  const indexFromX = useCallback(
    (x: number) => {
      if (step <= 0) return 0;
      return clampIndex(Math.round(-x / step));
    },
    [clampIndex, step]
  );

  const stopSpring = useCallback(() => {
    springRef.current?.cancel();
    springRef.current = null;
  }, []);

  const settleTo = useCallback(
    (targetIndex: number, releaseVelocity = 0) => {
      const i = clampIndex(targetIndex);
      const targetX = -i * step;
      setIndex(i);
      stopSpring();

      if (reduceMotion || Math.abs(xRef.current - targetX) < 0.5) {
        applyX(targetX);
        return;
      }

      // Bounce only when a flick carried momentum (Apple: damping ~0.8 after gesture)
      const hadFlick = Math.abs(releaseVelocity) > 200;
      springRef.current = animateSpring(
        xRef.current,
        targetX,
        (v) => applyX(v),
        {
          response: 0.35,
          dampingRatio: hadFlick ? 0.85 : 1,
          velocity: releaseVelocity,
        }
      );
    },
    [applyX, clampIndex, reduceMotion, step, stopSpring]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setViewportW(el.clientWidth);
    });
    ro.observe(el);
    setViewportW(el.clientWidth);
    return () => ro.disconnect();
  }, [count]);

  // Keep position aligned when layout/step changes
  useEffect(() => {
    if (count < 2 || step <= 0) return;
    stopSpring();
    applyX(-indexRef.current * step);
  }, [viewportW, count, step, applyX, stopSpring]);

  const goTo = useCallback(
    (i: number) => {
      settleTo(i, 0);
    },
    [settleTo]
  );

  const goNext = useCallback(() => {
    if (count < 2) return;
    goTo(indexRef.current + 1);
  }, [count, goTo]);

  const goPrev = useCallback(() => {
    if (count < 2) return;
    goTo(indexRef.current - 1);
  }, [count, goTo]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, goNext, goPrev]);

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.muted = true;
        void el.play().catch(() => {});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [index]);

  videoRefs.current.length = count;

  const constrain = useCallback(
    (x: number) => {
      if (x > maxX) return maxX + rubberband(x - maxX, slideW || viewportW || 1);
      if (x < minX) return minX - rubberband(minX - x, slideW || viewportW || 1);
      return x;
    },
    [maxX, minX, slideW, viewportW]
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (count < 2 || e.button !== 0) return;
    // Interrupt spring from live presentation value (Apple §3)
    if (springRef.current) {
      const live = springRef.current.get();
      stopSpring();
      applyX(live);
    }
    viewportRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: xRef.current,
      dragging: false,
      axisLocked: null,
    };
    velocity.current.reset(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (drag.axisLocked === null) {
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      if (adx < DRAG_THRESHOLD && ady < DRAG_THRESHOLD) return;
      drag.axisLocked = adx >= ady;
      if (!drag.axisLocked) {
        viewportRef.current?.releasePointerCapture(e.pointerId);
        dragRef.current = null;
        return;
      }
      drag.dragging = true;
    }

    if (!drag.axisLocked) return;

    e.preventDefault();
    velocity.current.add(e.clientX);
    applyX(constrain(drag.originX + dx));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;

    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }

    if (!drag.dragging) {
      setIndex(indexFromX(xRef.current));
      return;
    }

    const v = velocity.current.velocity();
    // Project resting point from release velocity, then snap nearest (Apple §6)
    const projected = xRef.current + project(v, DECELERATION);
    let target = indexFromX(projected);

    if (Math.abs(v) > 450) {
      const direction = v < 0 ? 1 : -1;
      const fromIndex = indexFromX(xRef.current);
      if (direction > 0 && target <= fromIndex) target = fromIndex + 1;
      if (direction < 0 && target >= fromIndex) target = fromIndex - 1;
    }

    settleTo(target, v);
  };

  const onWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (count < 2 || step <= 0) return;
    const horizontal = Math.abs(e.deltaX) >= Math.abs(e.deltaY) || e.shiftKey;
    if (!horizontal) return;
    const delta = e.shiftKey && Math.abs(e.deltaX) < Math.abs(e.deltaY) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 0.5) return;
    e.preventDefault();
    stopSpring();
    applyX(constrain(xRef.current - delta));
    if (wheelSettleTimer.current) clearTimeout(wheelSettleTimer.current);
    wheelSettleTimer.current = setTimeout(() => {
      wheelSettleTimer.current = null;
      settleTo(indexFromX(xRef.current), 0);
    }, 90);
  };

  useEffect(() => {
    return () => {
      stopSpring();
      if (wheelSettleTimer.current) clearTimeout(wheelSettleTimer.current);
    };
  }, [stopSpring]);

  return (
    <section id="travel" className="section hairline bg-[var(--surface-secondary)]" aria-label="Travel gallery">
      <div className="section-inner-wide text-center">
        <h2 className="text-title text-[var(--foreground)]">Travel</h2>
        <p className="mx-auto mt-3 max-w-xl text-callout text-[var(--foreground-secondary)]">
          Bytes aside, Miles ahead.
        </p>

        <div className="mt-12">
          {count === 0 ? (
            <div
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--fill)] px-6 text-center ${frameAspect}`}
            >
              <p className="text-callout font-medium text-[var(--foreground-secondary)]">Gallery coming soon</p>
              <p className="max-w-sm text-caption">
                Add entries to <span className="font-mono">travelMoments</span> in{" "}
                <span className="font-mono">lib/content.ts</span> and store media in{" "}
                <span className="font-mono">public/videos/</span>.
              </p>
            </div>
          ) : count === 1 ? (
            <div className={`relative w-full overflow-hidden rounded-2xl bg-[var(--fill)] ${frameAspect}`}>
              {travelMoments[0].kind === "image" ? (
                <Image
                  src={travelMoments[0].src}
                  alt={travelMoments[0].alt ?? travelMoments[0].caption ?? "Travel photo"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[0] = el;
                  }}
                  className="pointer-events-none h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={travelMoments[0].poster}
                  disablePictureInPicture
                  aria-label="Muted travel video clip"
                >
                  <source src={travelMoments[0].src} type={videoMimeType(travelMoments[0].src)} />
                </video>
              )}
            </div>
          ) : (
            <div>
              <div
                ref={viewportRef}
                className="relative touch-pan-y overflow-hidden select-none"
                role="region"
                aria-roledescription="carousel"
                aria-label="Travel photos and videos — drag or swipe"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
              >
                <div
                  ref={trackRef}
                  className="flex will-change-transform"
                  style={{
                    gap: GAP_PX,
                    paddingLeft: viewportW > 0 ? (viewportW - slideW) / 2 : "5%",
                    paddingRight: viewportW > 0 ? (viewportW - slideW) / 2 : "5%",
                  }}
                >
                  {travelMoments.map((m, i) => (
                    <div
                      key={`${m.kind}-${m.src}-${i}`}
                      className="shrink-0"
                      style={{ width: slideW > 0 ? slideW : "88%" }}
                      aria-hidden={i !== index}
                    >
                      <div className={`relative w-full overflow-hidden rounded-2xl bg-[var(--fill)] ${frameAspect}`}>
                        {m.kind === "image" ? (
                          <Image
                            src={m.src}
                            alt={m.alt ?? m.caption ?? "Travel photo"}
                            fill
                            className="pointer-events-none object-cover"
                            sizes="(max-width: 1280px) 90vw, 1152px"
                            priority={i === 0}
                            draggable={false}
                          />
                        ) : (
                          <video
                            ref={(el) => {
                              videoRefs.current[i] = el;
                            }}
                            className="pointer-events-none h-full w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload={index === i ? "auto" : "metadata"}
                            poster={m.poster}
                            disablePictureInPicture
                            aria-label="Muted travel video clip"
                          >
                            <source src={m.src} type={videoMimeType(m.src)} />
                          </video>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="pressable pressable-hover rounded-full px-3 py-2 text-[13px] font-medium tracking-[-0.01em] text-[var(--foreground-secondary)] disabled:opacity-30"
                  aria-label="Previous slide"
                  disabled={index === 0}
                  onClick={goPrev}
                >
                  ←
                </button>
                <div className="flex justify-center gap-2" role="tablist" aria-label="Slide indicators">
                  {travelMoments.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`pressable h-1.5 rounded-full bg-[var(--foreground)] transition-[width,opacity] duration-[var(--duration-ui)] ease-[var(--ease-out)] ${
                        i === index ? "w-6 opacity-90" : "w-1.5 opacity-25"
                      }`}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="pressable pressable-hover rounded-full px-3 py-2 text-[13px] font-medium tracking-[-0.01em] text-[var(--foreground-secondary)] disabled:opacity-30"
                  aria-label="Next slide"
                  disabled={index === count - 1}
                  onClick={goNext}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
