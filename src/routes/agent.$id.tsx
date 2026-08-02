import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Crosshair,
  Layers,
  Shield,
} from "lucide-react";
import { CLEARANCE_LABEL, getAgent } from "@/data/agents";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agent/$id")({
  component: AgentDossierPage,
  loader: ({ params }) => {
    const agent = getAgent(params.id);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.agent.codename} · Agent Lexicon`
          : "Agent Lexicon",
      },
    ],
  }),
});

function clearanceVariant(c: string) {
  return c.toLowerCase() as "s" | "a" | "b" | "c";
}

const ACCENT_MONO = {
  steel: "bg-bg-subtle text-fg-muted border-border-strong",
  ember: "bg-clearance-s/10 text-clearance-s border-clearance-s/25",
  moss: "bg-success/10 text-success border-success/25",
  ink: "bg-fg/5 text-fg-muted border-border-strong",
  frost: "bg-clearance-b/10 text-clearance-b border-clearance-b/25",
} as const;

function AgentDossierPage() {
  const { agent } = Route.useLoaderData();
  const bookmarks = useBookmarks();
  const bookmarked = bookmarks.has(agent.id);

  return (
    <div className="min-h-[calc(100dvh-var(--grok-banner-h,0px))] bg-bg text-fg">
      <SiteHeader bookmarkCount={bookmarks.count} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <Link
          to="/"
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] text-sm text-fg-muted hover:text-fg transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to roster
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div
                className={cn(
                  "grid h-16 w-16 shrink-0 place-items-center rounded-[var(--radius-lg)] border font-mono text-lg font-semibold tracking-wider",
                  ACCENT_MONO[agent.accent],
                )}
              >
                {agent.monogram}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs tracking-widest text-fg-subtle uppercase">
                      {agent.callsign}
                    </p>
                    <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-fg">
                      {agent.codename}
                    </h1>
                    <p className="mt-2 text-fg-muted">{agent.specialty}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => bookmarks.toggle(agent.id)}
                    className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] border border-border-strong bg-bg px-3 text-xs font-medium text-fg hover:bg-bg-subtle shrink-0"
                  >
                    {bookmarked ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 text-accent" />
                        Marked
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        Mark agent
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{agent.position}</Badge>
                  <Badge variant={clearanceVariant(agent.clearance)}>
                    Clearance {agent.clearance}
                  </Badge>
                  <Badge variant="default">{agent.status}</Badge>
                  <Badge variant="default">{agent.years} yrs field</Badge>
                </div>
              </div>
            </div>

            <blockquote className="mt-8 border-l-2 border-border-strong pl-4 text-lg text-fg italic leading-snug">
              “{agent.quote}”
            </blockquote>

            <section className="mt-8">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase text-fg-subtle">
                Dossier
              </h2>
              <p className="mt-3 text-base text-fg-muted leading-relaxed">
                {agent.dossier}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase text-fg-subtle flex items-center gap-2">
                <Crosshair className="h-3.5 w-3.5" />
                Mission profile
              </h2>
              <ul className="mt-3 space-y-2">
                {agent.ops.map((op) => (
                  <li
                    key={op}
                    className="flex gap-3 text-sm text-fg-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
                    {op}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase text-fg-subtle flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" />
                Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {agent.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-[var(--radius-sm)] border border-border bg-bg px-3 py-1.5 font-mono text-xs text-fg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase text-fg-subtle flex items-center gap-2">
                <Shield className="h-3.5 w-3.5" />
                Clearance
              </h2>
              <p className="mt-3 font-mono text-2xl font-semibold text-fg tracking-tight">
                Level {agent.clearance}
              </p>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                {CLEARANCE_LABEL[agent.clearance]}
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase text-fg-subtle">
                Traits
              </h2>
              <ul className="mt-3 space-y-2">
                {agent.traits.map((t) => (
                  <li
                    key={t}
                    className="rounded-[var(--radius-md)] border border-border bg-bg px-3 py-2 text-sm text-fg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5">
              <h2 className="font-display text-sm font-semibold tracking-wide uppercase text-fg-subtle">
                Position desk
              </h2>
              <p className="mt-3 text-lg font-medium text-fg">{agent.position}</p>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                Primary seat on the product line. Pair this agent with
                complementary positions for full-stack strike teams.
              </p>
              <Link
                to="/"
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-[var(--radius-sm)] border border-border-strong bg-bg text-xs font-medium text-fg hover:bg-bg-subtle"
              >
                Back to full roster
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
