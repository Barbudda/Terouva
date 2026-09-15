import { PROBLEM } from "@/lib/content";

export function Problem() {
  return (
    <section id="pourquoi" className="border-t border-rule py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-12 md:gap-8">
        <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:col-span-5 md:text-[2.75rem]">
          {PROBLEM.title}
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-ink-2 md:col-span-6 md:col-start-7">
          {PROBLEM.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
