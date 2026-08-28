---
name: emil-design-eng
description: Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great. Use when building or reviewing UI, animations, buttons, materials, shadows, borders, or interaction polish.
---

# Design Engineering (Emil Kowalski)

## Core Philosophy

Unseen details compound. Taste is trained. Beauty is leverage.

## Animation Decision Framework

1. **Should this animate?** 100+/day → never. Tens/day → near-imperceptible. Occasional → standard. Rare → delight allowed.
2. **Purpose?** Feedback, spatial consistency, state indication, preventing jarring changes, explanation, or delight. Can't name it → don't animate.
3. **Easing:** Enter/exit → ease-out. Moving on screen → ease-in-out. Hover/color → ease. Constant → linear. Never ease-in for UI.
4. **Duration:** Press 100–160ms. Tooltips 125–200ms. Dropdowns 150–250ms. Modals 200–500ms. UI under 300ms.

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

## Hard Rules

- Buttons: `scale(0.97)` on `:active`
- Never `scale(0)` — start from `scale(0.95)` + opacity
- `transform` and `opacity` only
- Never `transition: all`
- Name exact properties
- Popovers origin-aware; modals stay centered
- Reduced motion ships with the animation
- Gate hover motion with `@media (hover: hover) and (pointer: fine)`

## Materials

- Prefer semi-transparent shadows over solid borders for depth
- Translucent surfaces with backdrop-filter for floating chrome
- Never stack light glass on light glass
