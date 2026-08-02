import { Link } from "@tanstack/react-router";
import { BookMarked, LayoutGrid } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export function SiteHeader({
  bookmarkCount = 0,
  onShowBookmarks,
  showBookmarksActive = false,
}: {
  bookmarkCount?: number;
  onShowBookmarks?: () => void;
  showBookmarksActive?: boolean;
}) {
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-[var(--grok-banner-h,0px)] z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
          <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] border border-border-strong bg-bg-elevated font-mono text-[10px] font-semibold tracking-widest text-fg">
            AL
          </span>
          <div className="min-w-0">
            <div className="font-display text-sm font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
              Agent Lexicon
            </div>
            <div className="hidden sm:block text-[11px] text-fg-subtle font-mono tracking-wide">
              FIELD CODEX // DEV POSITIONS
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-xs font-medium text-fg-muted hover:bg-bg-subtle hover:text-fg transition-colors"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Roster
          </Link>

          {onShowBookmarks && (
            <button
              type="button"
              onClick={onShowBookmarks}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-xs font-medium transition-colors",
                showBookmarksActive
                  ? "bg-bg-subtle text-fg"
                  : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
              )}
            >
              <BookMarked className="h-3.5 w-3.5" />
              <span className="hidden xs:inline sm:inline">Marked</span>
              {bookmarkCount > 0 && (
                <span className="font-mono text-[10px] tabular-nums text-fg-subtle">
                  {bookmarkCount}
                </span>
              )}
            </button>
          )}

          <div className="ml-1 flex items-center">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-bg-subtle" />
            ) : user ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <SignedOut>
                <Link
                  to="/login"
                  className="inline-flex h-9 items-center rounded-[var(--radius-sm)] border border-border-strong bg-bg-elevated px-3 text-xs font-medium text-fg hover:bg-bg-subtle transition-colors"
                >
                  Sign in
                </Link>
              </SignedOut>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
