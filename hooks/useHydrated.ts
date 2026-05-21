"use client";

import { useLayoutEffect, useState } from "react";

/**
 * False on server and on the first client render (matches SSR).
 * True only after mount — safe for pointer/magnetic effects without hydration mismatch.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    // Flip after SSR hydration; must not use useSyncExternalStore(true) on first client paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration client-only UI
    setHydrated(true);
  }, []);

  return hydrated;
}
