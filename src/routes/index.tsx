import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Shield, Users, X } from "lucide-react";
import {
  AGENTS,
  POSITIONS,
  searchAgents,
  type Clearance,
  type Position,
} from "@/data/agents";
import { AgentCard } from "@/components/agent-card";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const CLEARANCES: Array<Clearance | "All"> = ["All", "S", "A", "B", "C"];

const FEATURED_IDS = ["iron-man", "r2d2", "neo"] as const;

function HomePage() {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<Position | "All">("All");
  const [clearance, setClearance] = useState<Clearance | "All">("All");
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const bookmarks = useBookmarks();

  const featured = useMemo(
    () =>
      FEATURED_IDS.map((id) => AGENTS.find((a) => a.id === id)).filter(
        (a): a is NonNullable<typeof a> => Boolean(a),
      ),
    [],
  );

  const results = useMemo(() => {
    let list = searchAgents(query, position, clearance);
    if (bookmarksOnly) {
      list = list.filter((a) => bookmarks.ids.includes(a.id));
    }
    return list;
  }, [query, position, clearance, bookmarksOnly, bookmarks.ids]);

  const positionCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of POSITIONS) map.set(p, 0);
    for (const a of AGENTS) map.set(a.position, (map.get(a.position) ?? 0) + 1);
    return map;
  }, []);

  const showFeatured =
    !bookmarksOnly &&
    !query &&
    position === "All" &&
    clearance === "All";

  return (
    <div className="min-h-[calc(100dvh-var(--grok-banner-h,0px))] bg-bg text-fg">
      <SiteHeader
        bookmarkCount={bookmarks.count}
        showBookmarksActive={bookmarksOnly}
        onShowBookmarks={() => setBookmarksOnly((v) => !v)}
      />

      <main>
        <section className="relative border-b border-border overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-fg)_6%,transparent),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10 sm:pb-14">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge variant="outline" className="font-mono tracking-wider">
                CLASSIFIED // READ-ONLY
              </Badge>
              <Badge variant="default" className="font-mono">
                {AGENTS.length} AGENTS
              </Badge>
            </div>

            <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1] max-w-2xl text-fg">
              Agent Lexicon
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-fg-muted leading-relaxed">
              Field codex of codenamed operatives —{" "}
              <span className="text-fg">Iron Man</span>,{" "}
              <span className="text-fg">R2-D2</span>,{" "}
              <span className="text-fg">Neo</span> from the Matrix, plus Joker,
              Vader, and the rest of the shipping crew.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                {
                  label: "Roster size",
                  value: String(AGENTS.length),
                  icon: Users,
                },
                {
                  label: "Positions",
                  value: String(POSITIONS.length),
                  icon: LayoutIcon,
                },
                {
                  label: "S-clearance",
                  value: String(AGENTS.filter((a) => a.clearance === "S").length),
                  icon: Shield,
                },
                {
                  label: "Frontend",
                  value: String(
                    AGENTS.filter((a) => a.position === "Frontend").length,
                  ),
                  icon: FrontendIcon,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated/80 p-3.5 sm:p-4"
                >
                  <stat.icon className="h-3.5 w-3.5 text-fg-subtle mb-2" />
                  <div className="font-mono text-xl sm:text-2xl font-semibold tabular-nums tracking-tight text-fg">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-fg-subtle mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showFeatured ? (
          <section className="border-b border-border bg-bg-elevated/30">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
              <div className="mb-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  Featured cell
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold tracking-tight">
                  Iron Man · R2-D2 · Neo
                </h2>
                <p className="mt-1 text-sm text-fg-muted">
                  Platform suit, astromech recovery, Matrix fullstack — the
                  strike trio.
                </p>
              </div>
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((agent, i) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    index={i}
                    bookmarked={bookmarks.has(agent.id)}
                    onToggleBookmark={bookmarks.toggle}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-b border-border bg-bg-elevated/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Iron Man, R2-D2, Neo, stacks…"
                className="pl-10 pr-10"
                aria-label="Search agents"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-[var(--radius-sm)] text-fg-subtle hover:text-fg hover:bg-bg-subtle"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle mr-1">
                  Position
                </span>
                <FilterChip
                  active={position === "All"}
                  onClick={() => setPosition("All")}
                >
                  All
                </FilterChip>
                {POSITIONS.map((p) => (
                  <FilterChip
                    key={p}
                    active={position === p}
                    onClick={() => setPosition(p)}
                  >
                    {p}
                    <span className="font-mono text-[10px] opacity-60 tabular-nums">
                      {positionCounts.get(p) ?? 0}
                    </span>
                  </FilterChip>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle mr-1">
                  Clearance
                </span>
                {CLEARANCES.map((c) => (
                  <FilterChip
                    key={c}
                    active={clearance === c}
                    onClick={() => setClearance(c)}
                  >
                    {c === "All" ? "All levels" : `Level ${c}`}
                  </FilterChip>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight">
                {bookmarksOnly ? "Marked agents" : "Active roster"}
              </h2>
              <p className="text-sm text-fg-muted mt-0.5">
                {results.length} match{results.length === 1 ? "" : "es"}
                {position !== "All" ? ` · ${position}` : ""}
                {clearance !== "All" ? ` · Clearance ${clearance}` : ""}
              </p>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded-[var(--radius-xl)] border border-dashed border-border-strong bg-bg-elevated/50 px-6 py-16 text-center">
              <p className="font-display text-base font-medium text-fg">
                No agents in this sector
              </p>
              <p className="mt-2 text-sm text-fg-muted max-w-sm mx-auto">
                {bookmarksOnly
                  ? "Mark dossiers from the roster to build your shortlist."
                  : "Widen filters or clear search to re-scan the lexicon."}
              </p>
              <button
                type="button"
                className="mt-5 inline-flex h-10 items-center rounded-[var(--radius-sm)] border border-border-strong bg-bg px-4 text-sm font-medium text-fg hover:bg-bg-subtle"
                onClick={() => {
                  setQuery("");
                  setPosition("All");
                  setClearance("All");
                  setBookmarksOnly(false);
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((agent, i) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  index={i}
                  bookmarked={bookmarks.has(agent.id)}
                  onToggleBookmark={bookmarks.toggle}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-fg-subtle">
            <p className="font-mono tracking-wide">
              AGENT LEXICON · DEV POSITION FIELD CODEX
            </p>
            <p>Fictional roster for product teams. Not affiliated with any IP.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
        active
          ? "border-accent/40 bg-accent text-accent-fg"
          : "border-border bg-bg text-fg-muted hover:border-border-strong hover:text-fg hover:bg-bg-subtle",
      )}
    >
      {children}
    </button>
  );
}

function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function FrontendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
