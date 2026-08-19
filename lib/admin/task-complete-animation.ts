/** Row highlight duration — keep in sync with admin-task-flash in admin.css */
export const TASK_COMPLETE_FLASH_MS = 520;

/** Checkbox / status pop — keep in sync with admin-task-pop in admin.css */
export const TASK_COMPLETE_POP_MS = 280;

/** Stagger between rows when completing multiple tasks */
export const TASK_COMPLETE_STAGGER_MS = 45;

/** Buffer after pop before refresh so the row stays in "done" until data updates */
export const TASK_COMPLETE_REFRESH_BUFFER_MS = 80;

export function waitForTaskCompleteAnimation(
  count = 1,
  options?: { staggerMs?: number },
): Promise<void> {
  const stagger = options?.staggerMs ?? TASK_COMPLETE_STAGGER_MS;
  const total =
    TASK_COMPLETE_POP_MS +
    TASK_COMPLETE_REFRESH_BUFFER_MS +
    Math.max(0, count - 1) * stagger;
  return new Promise((resolve) => {
    window.setTimeout(resolve, total);
  });
}
