---
name: apple-design
description: Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent materials and depth, typography (optical sizing, tracking, leading), reduced-motion, or the design foundations (feedback, spatial consistency, restraint) behind Apple-style interfaces.
---

# Apple Design

How Apple builds interfaces that stop feeling like a computer and start feeling like an extension of you. This knowledge comes from Apple's WWDC design talks — chiefly *Designing Fluid Interfaces* (WWDC 2018) — distilled and translated into the web platform (CSS, Pointer Events, `requestAnimationFrame`, spring libraries like Motion/Framer Motion).

The through-line: **an interface feels alive when motion starts from the current on-screen value, inherits the user's velocity, projects momentum forward, and can be grabbed and reversed at any instant.** Springs are the tool that makes all of this natural, because they are inherently interruptible and velocity-aware.

## The Core Idea

> "When we align the interface to the way we think and move, something magical happens — it stops feeling like a computer and starts feeling like a seamless extension of us."

An interface is fluid when it behaves like the physical world: things respond instantly, move continuously, carry momentum, resist at boundaries, and can be redirected mid-motion. Everything below is a way to get closer to that.

Apple frames design as serving four human needs: **safety/predictability, understanding, achievement, and joy.** Every rule here serves one of them.

## 1. Response — kill latency

The moment lag appears, the feeling of directness "falls off a cliff." Response is the foundation everything else is built on.

- **Respond on pointer-down, not on release.** Highlight a button the instant it's pressed. Waiting for `click`/touch-up to show feedback feels dead.
- **Be vigilant about every latency.** Audit debounces, artificial timers, transition waits, and the ~300ms tap delay. Anything on the input path that isn't essential is a regression.
- **Feedback must be continuous *during* the interaction, not just at the end.** For a drag, slider, or drawer, update the UI 1:1 with the pointer the whole way through — never animate only when the gesture completes.

```css
/* Feedback lives on the press, and it's instant */
.button:active {
  transform: scale(0.97);
  transition: transform 100ms ease-out;
}
```

## 2. Direct manipulation — 1:1 tracking

> "Touch and content should move together."

When the user drags something, it must stay glued to the finger — and respect the offset from *where they grabbed it*. Snapping to the element's center on grab breaks the illusion immediately.

- Use Pointer Events with `setPointerCapture` so tracking continues even when the pointer leaves the element's bounds.
- Track a short **velocity/position history** (last few `pointermove` events), not just the current point — you'll need velocity at release.

## 3. Interruptibility — the single most important principle

> "The thought and the gesture happen in parallel."

Every animation must be interruptible and redirectable at any moment. A user must be able to grab a moving element mid-flight and reverse it without waiting for the animation to finish.

- **Never lock out input during a transition.**
- **Always animate from the *presentation* (current) value, never the target value.**
- **Avoid CSS transitions and `@keyframes` for anything gesture-driven** — springs animate from the current value by default.
- **When a gesture reverses, blend velocity — don't hard-cut it.**
- **Decompose 2D motion into independent X and Y springs.**

## 4. Behavior over animation — use springs

Apple deliberately replaced the physics triplet (mass/stiffness/damping) with two designer-friendly parameters:

- **Damping ratio** — controls overshoot. `1.0` = critically damped, no bounce. `< 1.0` = overshoots. Lower = bouncier.
- **Response** — how quickly the value reaches the target, in seconds. Lower = snappier.

**Defaults:**
- Start most UI at **damping `1.0`** (critically damped).
- Add bounce (**damping ~`0.8`**) **only when the gesture itself carried momentum**.

| Interaction | Damping | Response |
| --- | --- | --- |
| Move / reposition | `1.0` | `0.4` |
| Rotation | `0.8` | `0.4` |
| Drawer / sheet | `0.8` | `0.3` |

## 5. Velocity handoff

When a gesture ends, the animation must **continue at the finger's exact velocity**.

## 6. Momentum projection

Don't snap to the nearest boundary from the *release point*. Use velocity to **project the resting position**.

```js
function project(initialVelocity /* px/s */, decelerationRate = 0.998) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}
```

## 7. Spatial consistency — symmetric paths, anchored origins

- **Enter and exit along the same path.**
- **Anchor interactions to their source.**
- **Mirror the easing on reversible transitions.**

## 8. Hint in the direction of the gesture

Intermediate motion should telegraph where things are going.

## 9. Rubber-banding — soft boundaries

At an edge, resist progressively instead of stopping hard.

## 10. Gesture design details

- **Tap:** highlight on touch-*down* (instant), commit on touch-*up*.
- **Drag/swipe:** require a small movement threshold (~10px) before committing.
- **Detect all plausible gestures in parallel**, then cancel losers once intent is clear.

## 11. Frame-level smoothness

Animate only compositor-friendly properties — `transform` and `opacity`.

## 12. Materials & depth — translucency conveys hierarchy

- **Build nav/toolbars/sheets as translucent layers** (`backdrop-filter: blur()` + semi-transparent background) with content scrolling underneath.
- **Material weight encodes hierarchy.** Never stack a light translucent surface on another.
- **Bigger surfaces should read as thicker:** stronger blur + deeper shadow.
- **Scroll edge effects, not hard dividers.**
- **Materialize, don't just fade.** Animate blur radius and scale together on enter/exit.

```css
.toolbar {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
```

## 13. Multimodal feedback

Causality, harmony, utility — add feedback only where it earns its place.

## 14. Reduced motion & accessibility

- **`prefers-reduced-motion: reduce`** — replace slides/springs with short opacity cross-fades.
- **`prefers-reduced-transparency: reduce`** — solid surfaces, drop blur.
- **`prefers-contrast: more`** — near-solid backgrounds with contrasting border.

## 15. Typography — optical sizing, tracking, leading

- **Tracking is size-specific.** Large display text wants *negative* tracking; small text wants slightly *positive* tracking. Tighten headings, leave body near `0`.
- **Leading tracks size inversely.** Tight on large headings, looser on body.
- **Build hierarchy from weight + size + leading as a set.**
- **Default to the platform's system font** before a custom face.

```css
:root { font: 100%/1.47 system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif; }

.display {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.022em;
  font-optical-sizing: auto;
}
```

## 16. Design foundations — eight principles

1. **Purpose.** Decide what *not* to build.
2. **Agency.** Keep people in control; forgiveness over confirmation spam.
3. **Responsibility.** Act in the user's interest.
4. **Familiarity.** Build on what people already know.
5. **Flexibility.** Design for different contexts and abilities.
6. **Simplicity — not minimalism.** Strip the unnecessary so the core purpose shines. Hierarchy so the most important thing is the most obvious.
7. **Craft.** Every spacing, timing, and alignment value is deliberate.
8. **Delight.** The result of getting the other seven right.

Tactical rules:
- **Feedback comes in four kinds:** status, completion, warning, error.
- **Wayfinding.** Every screen should answer: Where am I? Where can I go?
- **Grouping & mapping.** Proximity implies relationship.
- **Direct, specific labels** beat safe generic ones.

## Quick Reference

| Need | Technique | Concrete value |
| --- | --- | --- |
| Default UI spring | Critically damped | `bounce: 0`, `duration: 0.4` |
| Momentum spring | Slight bounce | `bounce: 0.2`, `duration: 0.4` |
| Translucent chrome | `backdrop-filter` | content scrolls under |
| Type tracking | Size-specific | tighten large (`-0.022em`), body `0` |
| Reduced motion | Cross-fade | `@media (prefers-reduced-motion)` |
| Press feedback | Instant scale | `scale(0.97)` on `:active` |
