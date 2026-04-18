export function HeroSection() {
  return (
    <div
      className="
        col-span-2
        md:col-span-7 
        md:row-span-4 
        bg-background 
        border border-foreground/10
        flex 
        flex-col 
        justify-center 
        p-6 
        md:p-8 
        lg:p-12
        min-h-[200px]
        md:min-h-0
      "
    >
      <h1
        className="
          font-[var(--font-display)] 
          text-4xl 
          sm:text-5xl 
          md:text-6xl 
          lg:text-7xl 
          xl:text-8xl
          font-bold 
          text-foreground 
          leading-[0.95]
          tracking-tight
          text-balance
        "
      >
        Robert Ross
        <br />
        Harburda
      </h1>
      <p className="mt-4 md:mt-6 text-muted text-sm md:text-base lg:text-lg tracking-wide uppercase">
        Engineer, Artist &amp; Producer
      </p>
    </div>
  );
}
