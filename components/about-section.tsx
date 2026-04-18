export function AboutSection() {
  return (
    <section className="min-h-screen w-full bg-background p-6 md:p-12 flex items-center justify-center" id="about">
      <div className="max-w-2xl">
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-foreground mb-6">
          About Me
        </h2>
        <p className="text-muted text-base md:text-lg leading-relaxed mb-4">
          Robert Ross Harburda is an accomplished audio engineer, artist, and producer with a passion for creating dynamic sonic experiences. With years of experience in the music industry, he combines technical expertise with creative vision to craft compelling audio narratives.
        </p>
        <p className="text-muted text-base md:text-lg leading-relaxed">
          Specializing in audio engineering and production, Robert brings a unique perspective to every project, blending vintage techniques with modern technology to achieve timeless, polished results.
        </p>
      </div>
    </section>
  );
}
