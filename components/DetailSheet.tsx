"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  animateSpring,
  createVelocityTracker,
  project,
  rubberband,
} from "@/lib/fluid";

type DetailSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 700;

export function DetailSheet({ open, onClose, title, children }: DetailSheetProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLButtonElement>(null);
  const yRef = useRef(0);
  const springRef = useRef<{ cancel: () => void; get: () => number } | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    originY: number;
  } | null>(null);
  const velocity = useRef(createVelocityTracker());
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const applyY = useCallback((y: number) => {
    yRef.current = y;
    const el = sheetRef.current;
    if (el) el.style.transform = `translate3d(0, ${y}px, 0)`;
    const scrim = scrimRef.current;
    if (scrim) {
      const t = Math.max(0, Math.min(1, 1 - Math.max(0, y) / 420));
      scrim.style.opacity = String(0.15 + t * 0.3);
    }
  }, []);

  const stopSpring = useCallback(() => {
    springRef.current?.cancel();
    springRef.current = null;
  }, []);

  const animateTo = useCallback(
    (to: number, velocityY = 0, onComplete?: () => void) => {
      stopSpring();
      if (reduceMotion) {
        applyY(to);
        onComplete?.();
        return;
      }
      springRef.current = animateSpring(yRef.current, to, (v) => applyY(v), {
        response: 0.32,
        dampingRatio: Math.abs(velocityY) > 200 ? 0.82 : 1,
        velocity: velocityY,
        restDelta: 0.75,
        restSpeed: 12,
        onComplete: () => {
          springRef.current = null;
          onComplete?.();
        },
      });
    },
    [applyY, reduceMotion, stopSpring]
  );

  const dismiss = useCallback(
    (velocityY = 800) => {
      if (closingRef.current) return;
      closingRef.current = true;
      const h = sheetRef.current?.offsetHeight ?? window.innerHeight;
      animateTo(h + 48, Math.max(velocityY, 600), () => {
        closingRef.current = false;
        setRendered(false);
        document.body.style.overflow = "";
        onCloseRef.current();
      });
    },
    [animateTo]
  );

  useEffect(() => {
    if (!mounted) return;

    if (open) {
      closingRef.current = false;
      setRendered(true);
      document.body.style.overflow = "hidden";
      return;
    }

    if (rendered && !closingRef.current) {
      dismiss(0);
    }
  }, [open, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  // After sheet mounts open, spring in from below
  useEffect(() => {
    if (!rendered || !open) return;
    const h = sheetRef.current?.offsetHeight ?? Math.min(window.innerHeight * 0.85, 720);
    applyY(h);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => animateTo(0, 0));
    });
    return () => cancelAnimationFrame(id);
  }, [rendered]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!rendered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss(900);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rendered, dismiss]);

  useEffect(() => {
    return () => {
      stopSpring();
      document.body.style.overflow = "";
    };
  }, [stopSpring]);

  const onHandlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (springRef.current) {
      const live = springRef.current.get();
      stopSpring();
      applyY(live);
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      originY: yRef.current,
    };
    velocity.current.reset(e.clientY);
  };

  const onHandlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dy = e.clientY - drag.startY;
    velocity.current.add(e.clientY);
    if (dy < 0) {
      applyY(-rubberband(-dy, 140));
    } else {
      applyY(drag.originY + dy);
    }
  };

  const onHandlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* */
    }

    const v = velocity.current.velocity();
    const projected = yRef.current + project(v);
    if (yRef.current > DISMISS_DISTANCE || projected > DISMISS_DISTANCE || v > DISMISS_VELOCITY) {
      dismiss(Math.max(v, 700));
    } else {
      animateTo(0, v);
    }
  };

  if (!mounted || !rendered) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-end" role="presentation">
      <button
        ref={scrimRef}
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.4 }}
        onClick={() => dismiss(900)}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="sheet-material relative z-10 flex max-h-[min(88dvh,820px)] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] shadow-[0_-12px_48px_rgba(0,0,0,0.22)] will-change-transform sm:mb-5 sm:max-w-xl sm:rounded-[28px]"
      >
        <div
          className="flex shrink-0 cursor-grab touch-none flex-col items-center pb-1 pt-3 active:cursor-grabbing"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
        >
          <span className="h-1 w-9 rounded-full bg-black/18" aria-hidden />
          <span className="sr-only">Drag down to close</span>
        </div>

        <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-1">
          <h2 id={titleId} className="pr-2 text-[21px] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => dismiss(900)}
            className="pressable flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-[13px] font-semibold text-[var(--foreground-secondary)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
