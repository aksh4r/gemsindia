# AI Prompt Box — Technical Improvement Spec

**File:** `components/ui/ai-prompt-box.tsx`
**Stack:** Next.js 16, React 19, TypeScript 5 (strict), Tailwind v4, shadcn/ui, Framer Motion 12

---

## 1. Code Quality Issues

### [HIGH] SSR-unsafe style injection (lines 32–36)

The `document.createElement("style")` block runs at module-evaluation time. In Next.js with SSR / RSC, this crashes on the server because `document` is not defined. The `typeof document !== "undefined"` guard prevents the crash but the effect still never runs on the server, so the first SSR paint has no scrollbar styles. The correct fix is to move these styles into a CSS file (or `globals.css`) and import them, or use a `useEffect` inside a client component.

```ts
// current — runs at module level, SSR-unsafe even with the guard
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  ...
}
```

### [HIGH] Broken useEffect dependency in VoiceRecorder (line 194)

`time` is listed as a dependency of the `useEffect` that calls `onStopRecording(time)`. This means every time the 1-second tick fires, the cleanup runs and calls `onStopRecording` with the current `time` value, then immediately re-creates the interval. The timer resets itself on every second. Use a `ref` to track time for the stop callback, or split the effect into two.

```ts
// BUG: time in deps causes the effect to teardown+re-run every second
React.useEffect(() => {
  ...
  onStopRecording(time);   // stale closure is fine here; time ref would be correct
}, [isRecording, time, onStartRecording, onStopRecording]);
```

### [HIGH] Visualizer bars regenerate random heights on every render (lines 214–222)

`Math.random()` is called inline in JSX during render. Every re-render (e.g. the 1-second timer tick) produces completely new heights and animation durations, causing a flash/jump. Heights and durations should be computed once (with `useMemo` or a stable constant array) and memoized.

### [HIGH] `cn` utility reimplemented locally instead of using project's `tailwind-merge` (line 8)

The project has both `clsx` and `tailwind-merge` installed. The local `cn` function is a plain string join with no Tailwind class-deduplication. Conflicting utility classes (e.g., two `text-` values) will not be resolved correctly. Replace with the standard shadcn pattern:

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

### [HIGH] Mode prefix is baked into the message string (lines 536–542)

Encoding mode metadata as a string prefix (`[Search: ...]`, `[Think: ...]`) couples the parent component to a fragile parsing contract. The `onSend` signature already accepts a second `files` argument; extend it to pass mode as structured data instead:

```ts
onSend?: (message: string, files?: File[], options?: { mode?: "search" | "think" | "canvas" }) => void;
```

### [MEDIUM] `PromptInput` has uncontrolled/controlled value ambiguity (lines 312–327)

`internalValue` is initialised from `value` prop only once. If the parent later changes `value`, `internalValue` stays stale. The component then delegates to `value ?? internalValue`, which silently ignores parent updates when `value` is `undefined` on the first render. Remove the internal state and require callers to provide either fully controlled or fully uncontrolled usage.

### [MEDIUM] `handleSubmit` is not wrapped in `useCallback` (lines 534–546)

`handleSubmit` is recreated on every render and is referenced inside a `onClick` JSX callback that also regenerates. For a component that re-renders on every keystroke this is minor but measurable. See Performance section for a full list.

### [MEDIUM] `processFile` is not in `useCallback` but is called inside multiple memoised callbacks (lines 473–486)

`handleDrop` and `handlePaste` are wrapped in `useCallback` with an empty dependency array, yet both call `processFile` which is recreated each render. The stale closure means `processFile` used inside `handleDrop` / `handlePaste` always captures the initial state setters (which are stable), but the pattern is fragile and will break if `processFile` ever reads from state.

### [MEDIUM] `files` array always replaced, never appended (line 482)

`setFiles([file])` discards any previously attached file instead of appending. If the UI ever supports multiple files this is a silent data-loss bug. Even for single-file use, the intent is not clear from the code; add a comment or rename to make single-file-only explicit.

### [MEDIUM] `handleRemoveFile` ignores the `index` parameter for `filePreviews` (lines 506–509)

The function accepts an `index` but clears `filePreviews` entirely with `setFilePreviews({})`. This works today because only one file is ever stored, but will break silently if multi-file support is added.

### [MEDIUM] Missing `'use client'` directive

The file uses `React.useState`, `React.useEffect`, `React.useRef`, `document`, and event listeners — all browser-only APIs. In Next.js 16 App Router, any file using these must be marked `'use client'`. Without the directive the component is treated as a Server Component and will throw at runtime.

### [LOW] `StopCircle` icon imported but only used inside the `Button` in a narrow condition; `Square` icon is also used only when `isLoading`

Both icons are used; this is fine. However `StopCircle` is from `lucide-react` while `Square` carries `fill-[#1F2023]` hardcoded as a Tailwind class with an arbitrary colour that will not honour dark-mode theming or CSS variables.

### [LOW] Empty interface `PromptInputActionsProps` (line 394)

```ts
interface PromptInputActionsProps extends React.HTMLAttributes<HTMLDivElement> {}
```

This is a lint warning under `@typescript-eslint/no-empty-object-type`. Use a type alias or remove the interface entirely.

### [LOW] `PromptInputBox` exported as `React.forwardRef` but `ref` is conditionally ignored (line 571)

```ts
ref={ref || promptBoxRef}
```

If the parent passes a `null` ref this still works, but the pattern is unusual. Prefer `React.useImperativeHandle` or simply always forward; keep a local ref via a separate `useRef` for internal use.

---

## 2. Accessibility Gaps

### [HIGH] Toolbar toggle buttons have no accessible name

The Search, Think, and Canvas `<button>` elements contain only an icon + a conditionally rendered label. When the label is hidden (collapsed state), screen readers announce nothing meaningful. Add `aria-label` or `aria-pressed` to each:

```tsx
<button
  type="button"
  aria-label="Toggle web search"
  aria-pressed={showSearch}
  onClick={() => handleToggleChange("search")}
>
```

### [HIGH] File attachment button has no accessible name beyond the tooltip

The Paperclip button has no `aria-label`. Tooltips from Radix are not reliably announced by all screen readers as a substitute for a label. Add `aria-label="Attach image"` directly on the button element.

### [HIGH] The submit/mic/stop button label changes dynamically but there is no live region

The button's meaning changes between "Send message", "Voice message", "Stop recording", and "Stop generation" based on state. Screen reader users who focus the button will read the old label from the previous focus. Use `aria-label` set dynamically and optionally a `aria-live="polite"` region to announce the mode change.

### [HIGH] Image preview thumbnails are not keyboard-accessible

The image thumbnail `<div onClick>` is not a button and cannot be reached via Tab. Replace with a `<button>` element:

```tsx
<button
  onClick={() => openImageModal(filePreviews[file.name])}
  aria-label={`Preview ${file.name}`}
  className="..."
>
```

### [HIGH] File remove button is nested inside a clickable container (line 590–598)

The remove `<button>` inside the image `<div onClick>` creates nested interactive elements. This violates WCAG 4.1.2 and causes confusing behaviour with `e.stopPropagation`. Restructure so the remove button and the preview button are siblings, not parent/child.

### [MEDIUM] `VoiceRecorder` has no ARIA live region for the recording timer

The time counter updates every second but is not announced to screen readers. Wrap it in a `<span role="timer" aria-live="off" aria-label="Recording duration">` (aria-live="off" so it does not announce every second, but is readable when focused).

### [MEDIUM] Textarea lacks an explicit `id`/`aria-label` association

The `<textarea>` has no `id`, `aria-label`, or `aria-labelledby`. Placeholder text is not a substitute for a label per WCAG 1.3.1.

### [MEDIUM] No `aria-disabled` on the `PromptInput` container div when disabled

The container `<div>` wraps interactive children but does not convey the disabled state to assistive technology. Set `aria-disabled={disabled}` on the wrapper.

### [MEDIUM] Mode toggles are not grouped as a toolbar

The three toggle buttons (Search, Think, Canvas) function as a single-select group but are not wrapped in a `role="toolbar"` or `role="group"` with an `aria-label`. Screen reader users cannot perceive the grouping.

```tsx
<div role="toolbar" aria-label="Message mode" className="flex items-center">
```

### [LOW] Dialog close button accessible name relies solely on `sr-only` span

This is correct practice, but the `<DialogPrimitive.Close>` already provides a default accessible name via Radix. Confirm there is no double-announcement by testing with VoiceOver/NVDA.

### [LOW] `ImageViewDialog` image alt text is generic

`alt="Full preview"` gives no information about the image content. Use `alt={file.name}` or pass a descriptive label through the dialog props.

---

## 3. Performance Improvements

### [HIGH] `Math.random()` called in render for visualizer bars

Every state update (the 1-second timer tick inside `VoiceRecorder`) re-renders and regenerates 32 random values. Memoize the bar configuration:

```ts
const barConfig = React.useMemo(
  () =>
    Array.from({ length: visualizerBars }, () => ({
      height: Math.max(15, Math.random() * 100),
      duration: 0.5 + Math.random() * 0.5,
    })),
  [visualizerBars]
);
```

### [HIGH] `PromptInputBox` re-renders on every keystroke, recreating all child callbacks

`handleSubmit`, `handleRemoveFile`, `openImageModal`, `handleCanvasToggle`, `handleToggleChange`, and `isImageFile` are all plain functions recreated on each render. Wrap each in `useCallback` with appropriate dependencies.

### [MEDIUM] `processFile` missing `useCallback`

Should be `useCallback` so it is stable across renders — especially important since it is closed over by `handleDrop` and `handlePaste`.

### [MEDIUM] Three Framer Motion `<motion.div>` wrappers share identical `animate`, `whileHover`, and `transition` props

Define the shared motion config once:

```ts
const toggleMotionProps = {
  transition: { type: "spring", stiffness: 260, damping: 25 },
  whileHover: { rotate: 15, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 } },
};
```

This does not affect runtime performance significantly but reduces bundle size and maintenance surface.

### [MEDIUM] `TooltipProvider` is instantiated inside `PromptInput`

Each `PromptInput` mount creates a new tooltip context. If the component is rendered multiple times on a page (e.g. in a chat UI with a floating bar), there will be multiple conflicting providers. Move `TooltipProvider` to the app-level layout.

### [MEDIUM] `FileReader` result stored in state as a data-URL string

For large images (up to 10 MB) this stores the full Base64 string in React state on every file change, doubling memory usage vs. using `URL.createObjectURL`. Revoke the object URL on cleanup:

```ts
const url = URL.createObjectURL(file);
setFilePreviews({ [file.name]: url });
// cleanup:
return () => URL.revokeObjectURL(url);
```

### [LOW] `[...Array(visualizerBars)]` creates a new array every render (line 214)

Even after memoizing the random values, the Array spread is inside JSX. Use `Array.from` with a memo to avoid the allocation.

### [LOW] `handleToggleChange` switches on a string instead of using a discriminated union or separate handlers

Minor: the string switch forces a linear check but is negligible at this scale.

---

## 4. Missing Features

### [HIGH] No actual microphone/audio recording implementation

`handleStartRecording` and `handleStopRecording` call `console.log` and send a fake placeholder string. There is no `MediaRecorder` API usage, no `getUserMedia` call, no audio blob capture. For production use, implement the Web Audio API pipeline or integrate a library such as `react-media-recorder`.

### [HIGH] No error handling for file operations

`processFile` logs to the console for invalid types and oversized files (`console.log("Only image files are allowed")`). Users receive no visible feedback. Add a toast/snackbar notification or an inline error message within the input box.

### [HIGH] No stop-generation callback

The stop button (`isLoading` state, square icon) is rendered but calls nothing when clicked — there is no `onStop` / `onCancel` prop. The `disabled={isLoading && !hasContent}` logic also means the stop button is disabled when there is no content, which is backwards; during generation there is typically no content in the box.

```ts
interface PromptInputBoxProps {
  onSend?: (message: string, files?: File[]) => void;
  onStop?: () => void;   // <-- missing
  isLoading?: boolean;
  ...
}
```

### [HIGH] No character / token limit with visual indicator

Production AI chat UIs expose a character/token counter and disable or warn when the input approaches the model context limit. No such limit or counter exists.

### [MEDIUM] No multi-file support

Only a single image can be attached at a time (`setFiles([file])` discards all previous files). Production prompt boxes typically support attaching multiple images or files.

### [MEDIUM] No loading / upload progress indication when attaching files

`FileReader` is async but there is no spinner or progress bar. For 10 MB files on a slow device this creates a perceived freeze.

### [MEDIUM] No keyboard shortcut hints in tooltips

Tooltips show plain text labels. Standard practice is to include the keyboard shortcut (e.g. "Send message  ⏎ Enter") in the tooltip content.

### [MEDIUM] No paste-from-clipboard hint

The component handles image paste silently. Users who don't know about this feature miss it entirely. A subtle hint (e.g., "Paste an image" shown on focus) would improve discoverability.

### [MEDIUM] No persistence / draft recovery

Input state is lost on unmount or page refresh. Consider `localStorage` or `sessionStorage` to persist draft messages.

### [LOW] No support for non-image file types despite the `onSend` signature accepting `File[]`

The `accept="image/*"` restriction and `isImageFile` guard mean PDFs, text files, and other types are silently dropped. Either extend support or update the UI copy to say "image" explicitly.

### [LOW] Voice recording does not actually constrain to a maximum duration

There is no configurable max recording length or automatic cutoff. A runaway recording would grow `time` indefinitely.

### [LOW] No emoji / mention / slash-command picker

Competitive AI chat UIs (ChatGPT, Claude.ai) include `@` mention and `/` command triggering. Not a blocker but expected in production.

---

## Quick Wins

These five changes are self-contained, low-risk, and can be shipped in under an hour each:

| # | Item | Priority | Effort |
|---|------|----------|--------|
| 1 | **Add `'use client'` directive** at the top of the file | High | 1 min |
| 2 | **Replace local `cn` with `clsx + twMerge`** using the project's already-installed packages | High | 5 min |
| 3 | **Add `aria-label` and `aria-pressed` to the three toggle buttons** (Search, Think, Canvas) | High | 10 min |
| 4 | **Add `aria-label="Attach image"` to the Paperclip button** and fix the `onStop` missing prop by wiring it to the stop button's `onClick` | High | 15 min |
| 5 | **Memoize visualizer bar config with `useMemo`** to stop the flashing random heights during recording | High | 10 min |

---

## Summary

The component is well-structured visually and demonstrates good compositional patterns (context-based child wiring, Radix primitives). The most critical production blockers are: the missing `'use client'` directive (will crash in Next.js App Router), the non-functional recording implementation, the missing `onStop` callback, the VoiceRecorder `useEffect` re-entrance bug, and the widespread accessibility gaps on interactive buttons.
