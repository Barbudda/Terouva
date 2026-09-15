import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@app/lib/cn";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md border border-rule bg-card", className)} {...rest} />;
}

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pt-4 pb-2 sm:px-5", className)} {...rest} />;
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold text-ink", className)} {...rest} />;
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 py-4 sm:px-5", className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 border-t border-rule px-4 py-3 sm:px-5",
        className,
      )}
      {...rest}
    />
  );
}

export type Tone = "neutral" | "muted" | "accent" | "good" | "warn" | "bad";

const TONES: Record<Tone, string> = {
  neutral: "bg-paper-2 text-ink",
  muted: "bg-paper-2 text-ink-3",
  accent: "bg-accent-wash text-accent-ink",
  good: "bg-good-wash text-good",
  warn: "bg-warn-wash text-warn",
  bad: "bg-bad-wash text-bad",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-[13px] font-medium",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatPill({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <Card className="px-4 py-3">
      <div className="text-sm text-ink-3">{label}</div>
      <div className="mt-1 font-serif text-3xl font-medium leading-none text-ink tabular">{value}</div>
      {hint && <div className="mt-1.5 text-[13px] text-ink-3">{hint}</div>}
    </Card>
  );
}

/** Bloc vide : un titre, une explication, et éventuellement une action. */
export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-md border border-dashed border-field px-6 py-12 text-center">
      <p className="font-serif text-2xl font-medium text-ink">{title}</p>
      {children && (
        <div className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-2">{children}</div>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
