import { useEffect, useState } from "react";

/**
 * Tracks which navigation group is currently in view.
 * Any element with `data-nav="<navId>"` contributes to that nav item.
 */
export function useActiveSection(defaultId = "home") {
  const [active, setActive] = useState(defaultId);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    if (!els.length) return;
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = defaultId;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) current = el.dataset.nav || defaultId;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [defaultId]);

  return active;
}
