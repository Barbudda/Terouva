import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@app/lib/cn";

const base =
  "w-full rounded-md border border-field bg-card px-3 py-2 text-[15px] text-ink placeholder:text-ink-3 " +
  "transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={cn(base, "h-10", className)} {...rest} />;
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(base, "min-h-[80px] resize-y leading-relaxed", className)}
        {...rest}
      />
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select
        ref={ref}
        className={cn(base, "select-arrow h-10 appearance-none pr-9", className)}
        {...rest}
      >
        {children}
      </select>
    );
  },
);

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1.5 block text-sm font-medium text-ink-2", className)}>
      {children}
    </label>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const hintNode = hint && <p className="mt-1.5 text-[13px] leading-snug text-ink-3">{hint}</p>;
  if (htmlFor) {
    return (
      <div className={className}>
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
        {hintNode}
      </div>
    );
  }
  // Sans id explicite, le libellé enveloppe le champ : il reste associé pour les
  // lecteurs d'écran et un clic sur le libellé place le curseur dans le champ.
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-2">{label}</span>
        {children}
      </label>
      {hintNode}
    </div>
  );
}
