import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
import type { Agent } from "@/data/agents";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ACCENT_RING: Record<Agent["accent"], string> = {
  steel: "from-fg-subtle/30 to-transparent",
  ember: "from-clearance-s/35 to-transparent",
  moss: "from-success/30 to-transparent",
  ink: "from-fg/20 to-transparent",
  frost: "from-clearance-b/40 to-transparent",
};

const ACCENT_MONO: Record<Agent["accent"], string> = {
  steel: "bg-bg-subtle text-fg-muted border-border-strong",
  ember: "bg-clearance-s/10 text-clearance-s border-clearance-s/25",
  moss: "bg-success/10 text-success border-success/25",
  ink: "bg-fg/5 text-fg-muted border-border-strong",
  frost: "bg-clearance-b/10 text-clearance-b border-clearance-b/25",
};

function clearanceVariant(c: Agent["clearance"]) {
  return c.toLowerCase() as "s" | "a" | "b" | "c";
}

export function AgentCard({
  agent,
  bookmarked,
  onToggleBookmark,
  index = 0,
}: {
  agent: Agent;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  index?: number;
}) {
  return (
    <article
      className="group relative flex flex-col rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 shadow-soft transition-[border-color,transform,background-color] duration-200 hover:border-border-strong hover:bg-bg-subtle/60 sm:p-6"
      style={{
        animationDelay: `${Math.min(index, 12) * 40}ms`,
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[var(--radius-xl)] bg-gradient-to-b opacity-70",
          ACCENT_RING[agent.accent],
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-[var(--radius-md)] border font-mono text-sm font-semibold tracking-wider",
              ACCENT_MONO[agent.accent],
            )}
          >
            {agent.monogram}
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold tracking-tight text-fg truncate">
              {agent.codename}
            </h2>
            <p className="font-mono text-xs text-fg-subtle tracking-wide">
              {agent.callsign}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark agent"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark(agent.id);
          }}
          className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-sm)] text-fg-muted transition-colors hover:bg-bg hover:text-fg"
        >
          {bookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-accent" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        <Badge variant="outline">{agent.position}</Badge>
        <Badge variant={clearanceVariant(agent.clearance)}>
          Clearance {agent.clearance}
        </Badge>
        <Badge variant="default">{agent.status}</Badge>
      </div>

      <p className="relative mt-4 text-sm text-fg-muted leading-relaxed line-clamp-2">
        {agent.specialty}
      </p>

      <p className="relative mt-3 text-sm text-fg-subtle italic line-clamp-2">
        “{agent.quote}”
      </p>

      <div className="relative mt-auto pt-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 min-w-0">
          {agent.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-[var(--radius-xs)] bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-subtle border border-border"
            >
              {s}
            </span>
          ))}
          {agent.stack.length > 3 && (
            <span className="rounded-[var(--radius-xs)] px-1.5 py-0.5 font-mono text-[11px] text-fg-subtle">
              +{agent.stack.length - 3}
            </span>
          )}
        </div>

        <Link
          to="/agent/$id"
          params={{ id: agent.id }}
          className="inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] border border-border-strong bg-bg px-3 text-xs font-medium text-fg transition-colors hover:bg-bg-subtle shrink-0"
        >
          Dossier
          <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
        </Link>
      </div>
    </article>
  );
}
