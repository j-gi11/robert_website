export function PagePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="font-[var(--font-display)] text-5xl md:text-6xl font-bold text-foreground mb-4">
          {title}
        </h1>
        <p className="text-muted text-lg md:text-xl">{description}</p>
      </div>
    </div>
  );
}
