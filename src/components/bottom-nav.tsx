import { Link, useRouterState } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { NAV_ITEMS, PRIMARY_NAV, isNavActive } from "@/lib/nav";

const tabClass =
  "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[1.25rem] px-0.5 text-xs font-medium no-underline transition-colors duration-150";
const onClass = "bg-seal text-seal-fg";
const offClass = "text-muted hover:text-fg";

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [moreOpen, setMoreOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMoreOpen(false), [pathname]);
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    window.addEventListener("keydown", onKey);
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  if (
    pathname.startsWith("/practice") ||
    pathname.startsWith("/results") ||
    pathname.startsWith("/login") ||
    pathname.includes("/study")
  ) {
    return null;
  }

  const primary = NAV_ITEMS.filter((i) => PRIMARY_NAV.includes(i.to));
  const more = NAV_ITEMS.filter((i) => !PRIMARY_NAV.includes(i.to));
  const moreActive = more.some((i) => isNavActive(i.to, pathname));

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-2 sm:px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden print:hidden"
      aria-label="Main"
    >
      {moreOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="pointer-events-auto fixed inset-0 -z-10 cursor-default bg-black/30"
            onClick={() => setMoreOpen(false)}
          />
          <div
            ref={sheetRef}
            id="more-sheet"
            className="pointer-events-auto mx-auto mb-2 grid max-w-lg grid-cols-3 gap-1 rounded-3xl border border-border/80 bg-bg/95 p-2 shadow-[var(--shadow-border)] backdrop-blur-xl"
          >
            {more.map(({ to, label, icon: Icon }) => {
              const on = isNavActive(to, pathname);
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-sm font-medium no-underline",
                    on ? onClass : "text-fg hover:bg-elevated",
                  )}
                >
                  <Icon className="size-5" strokeWidth={on ? 2.25 : 1.75} />
                  {label}
                </Link>
              );
            })}
          </div>
        </>
      )}
      <div className="pointer-events-auto mx-auto flex max-w-lg items-stretch rounded-[1.6rem] border border-border/80 bg-bg/80 p-1 shadow-[var(--shadow-border)] backdrop-blur-xl">
        {primary.map(({ to, label, icon: Icon }) => {
          const on = isNavActive(to, pathname);
          return (
            <Link
              key={to}
              to={to}
              aria-current={on ? "page" : undefined}
              className={cn(tabClass, on ? onClass : offClass)}
            >
              <span className="grid size-6 place-items-center">
                <Icon className="size-4" strokeWidth={on ? 2.25 : 1.75} />
              </span>
              {label}
            </Link>
          );
        })}
        <button
          type="button"
          aria-expanded={moreOpen}
          aria-controls="more-sheet"
          onClick={() => setMoreOpen((v) => !v)}
          className={cn(tabClass, moreActive || moreOpen ? onClass : offClass)}
        >
          <span className="grid size-6 place-items-center">
            <MoreHorizontal className="size-4" strokeWidth={moreActive ? 2.25 : 1.75} />
          </span>
          More
        </button>
      </div>
    </nav>
  );
}
