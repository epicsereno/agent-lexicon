import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="min-h-[calc(100dvh-var(--grok-banner-h,0px))] grid place-items-center bg-bg px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-fg-subtle hover:text-fg"
          >
            <span className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] border border-border-strong bg-bg-elevated text-[10px] font-semibold text-fg">
              AL
            </span>
            AGENT LEXICON
          </Link>
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-fg-muted">
            Access your marked agents across sessions when deployed.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6 space-y-3 shadow-soft">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-fg-muted text-center py-2">
              Sign-in is disabled.
            </p>
          )}
        </div>

        <p className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-fg-muted hover:text-fg underline-offset-4 hover:underline"
          >
            Back to roster
          </Link>
        </p>
      </div>
    </main>
  );
}
