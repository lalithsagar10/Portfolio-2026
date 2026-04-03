"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { travelMoments } from "@/lib/content";
import { videoMimeType } from "@/lib/videoMimeType";

/** Wide frame with a bit more height than ultra-cinematic (~2:1). */
const frameAspect = "aspect-[2/1]";

const GAP_PX = 12;
/** Fraction of viewport width for the focused slide; remainder shows peek of neighbors. */
const SLIDE_WIDTH_RATIO = 0.9;

export function Travel() {
  const count = travelMoments.length;
  const [index, setIndex] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const slideW = viewportW > 0 ? viewportW * SLIDE_WIDTH_RATIO : 0;
  const step = slideW + GAP_PX;
  const inset = viewportW > 0 ? (viewportW - slideW) / 2 : 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setViewportW(el.clientWidth);
    });
    ro.observe(el);
    setViewportW(el.clientWidth);
    return () => ro.disconnect();
  }, [count]);

  const scrollToIndex = useCallback(
    (i: number, behavior: ScrollBehavior = "smooth") => {
      const el = scrollRef.current;
      if (!el || count < 2 || step <= 0) return;
      const clamped = Math.max(0, Math.min(count - 1, i));
      el.scrollTo({ left: clamped * step, behavior });
    },
    [count, step]
  );

  useEffect(() => {
    if (count < 2 || step <= 0) return;
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (scrollSyncTimer.current) clearTimeout(scrollSyncTimer.current);
      scrollSyncTimer.current = setTimeout(() => {
        scrollSyncTimer.current = null;
        const next = Math.round(el.scrollLeft / step);
        const clamped = Math.max(0, Math.min(count - 1, next));
        setIndex((prev) => (prev === clamped ? prev : clamped));
      }, 64);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollSyncTimer.current) clearTimeout(scrollSyncTimer.current);
    };
  }, [count, step]);

  useEffect(() => {
    if (count < 2 || step <= 0) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = indexRef.current * step;
  }, [viewportW, count, step]);

  const goNext = useCallback(() => {
    if (count < 2) return;
    const next = Math.min(count - 1, index + 1);
    setIndex(next);
    scrollToIndex(next);
  }, [count, index, scrollToIndex]);

  const goPrev = useCallback(() => {
    if (count < 2) return;
    const next = Math.max(0, index - 1);
    setIndex(next);
    scrollToIndex(next);
  }, [count, index, scrollToIndex]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, goNext, goPrev]);

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.muted = true;
        void el.play().catch(() => {
          /* autoplay policy or decode */
        });
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [index]);

  videoRefs.current.length = count;

  const onDotClick = (i: number) => {
    setIndex(i);
    scrollToIndex(i, "smooth");
  };

  return (
    <section
      id="travel"
      className="scroll-mt-20 border-t border-stone-200/80 px-6 py-20 sm:px-8 sm:py-28"
      aria-label="Travel gallery"
    >
      <div className="mx-auto w-full max-w-7xl text-center">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">Travel</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-500 sm:text-base">
          Bytes aside, Miles ahead.
        </p>

        <div className="mt-12">
          {count === 0 ? (
            <div
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300/80 bg-white/40 px-6 text-center shadow-[0_1px_0_rgba(0,0,0,0.03)] ${frameAspect}`}
            >
              <p className="text-sm font-medium text-stone-600">Gallery coming soon</p>
              <p className="max-w-sm text-xs leading-relaxed text-stone-500 sm:text-sm">
                Add entries to <span className="font-mono text-[0.8rem] text-stone-600">travelMoments</span> in{" "}
                <span className="font-mono text-[0.8rem] text-stone-600">lib/content.ts</span> and store media in{" "}
                <span className="font-mono text-[0.8rem] text-stone-600">public/videos/</span> (same folder as the hero
                video).
              </p>
            </div>
          ) : count === 1 ? (
            <div className="rounded-2xl border border-stone-200/80 bg-white/60 p-2 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-3">
              <div className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl ${frameAspect}`}>
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
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200/80 bg-white/60 p-2 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-3">
              <div
                ref={scrollRef}
                className="nav-scrollbar relative snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth rounded-xl sm:rounded-2xl"
                role="region"
                aria-roledescription="carousel"
                aria-label="Travel photos and videos — swipe horizontally"
              >
                <div
                  className="flex"
                  style={{
                    gap: GAP_PX,
                    paddingLeft: inset,
                    paddingRight: inset,
                  }}
                >
                  {travelMoments.map((m, i) => (
                    <div
                      key={`${m.kind}-${m.src}-${i}`}
                      className="shrink-0 snap-center snap-always"
                      style={{ width: slideW > 0 ? slideW : "90%" }}
                    >
                      <div
                        className={`relative w-full overflow-hidden rounded-lg bg-stone-200/30 sm:rounded-xl ${frameAspect}`}
                      >
                        {m.kind === "image" ? (
                          <Image
                            src={m.src}
                            alt={m.alt ?? m.caption ?? "Travel photo"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1280px) 90vw, 1152px"
                            priority={i === 0}
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

              <div className="mt-5 flex justify-center gap-2.5" role="tablist" aria-label="Slide indicators">
                {travelMoments.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                      i === index ? "w-7 bg-stone-800/90" : "w-1.5 bg-stone-300/90 hover:bg-stone-400/90"
                    }`}
                    onClick={() => onDotClick(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
