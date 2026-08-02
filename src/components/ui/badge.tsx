import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "border-border bg-bg-subtle text-fg-muted",
        accent: "border-transparent bg-accent/15 text-accent",
        s: "border-clearance-s/30 bg-clearance-s/15 text-clearance-s",
        a: "border-clearance-a/30 bg-clearance-a/15 text-clearance-a",
        b: "border-clearance-b/30 bg-clearance-b/15 text-clearance-b",
        c: "border-clearance-c/30 bg-clearance-c/15 text-clearance-c",
        outline: "border-border-strong text-fg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
