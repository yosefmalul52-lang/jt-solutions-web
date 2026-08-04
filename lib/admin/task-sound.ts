/** Play task-complete click (no-op if blocked / missing). */
export function playTaskCompleteSound(): void {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio("/sounds/task-complete.mp3");
    audio.volume = 0.55;
    void audio.play().catch(() => {
      /* autoplay / missing file — ignore */
    });
  } catch {
    /* ignore */
  }
}
