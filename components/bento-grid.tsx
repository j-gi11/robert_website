export function BentoGrid() {
  return (
    <div className="min-h-screen w-full p-3 md:p-4 lg:p-6 bg-background">
      <div
        className="
          grid 
          min-h-[calc(100vh-1.5rem)] 
          md:h-[calc(100vh-2rem)] 
          lg:h-[calc(100vh-3rem)]
          gap-3 
          md:gap-4 
          grid-cols-2
          auto-rows-[minmax(80px,auto)]
          md:grid-cols-12
          md:grid-rows-6
        "
      >
        {/* Main Header Block - Largest, Top Left */}
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
            Audio Engineering / Senior Presentation
          </p>
        </div>

        {/* Dark Blue Block - Top Right */}
        <div
          className="
            col-span-2
            md:col-span-5 
            md:row-span-2 
            bg-dark-blue
            min-h-[100px]
            md:min-h-0
          "
        />

        {/* Bright Purple Block */}
        <div
          className="
            col-span-1
            md:col-span-3 
            md:row-span-2 
            bg-bright-purple
            min-h-[80px]
            md:min-h-0
          "
        />

        {/* Muted Orange Block */}
        <div
          className="
            col-span-1
            md:col-span-2 
            md:row-span-2 
            bg-muted-orange
            min-h-[80px]
            md:min-h-0
          "
        />

        {/* Deep Red Block with Text */}
        <div
          className="
            col-span-2
            md:col-span-4 
            md:row-span-2 
            bg-deep-red
            flex
            items-center
            justify-center
            p-4
            md:p-6
            min-h-[120px]
            md:min-h-0
          "
        >
          <p
            className="
              text-white 
              text-lg 
              sm:text-xl 
              md:text-2xl 
              lg:text-3xl
              font-bold
              text-center
              leading-tight
              tracking-wide
            "
          >
            Engineer
            <br />
            Artist &amp; Producer
          </p>
        </div>

        {/* Muted Green Block */}
        <div
          className="
            col-span-1
            md:col-span-3 
            md:row-span-2 
            bg-muted-green
            min-h-[80px]
            md:min-h-0
          "
        />

        {/* Small Purple Block */}
        <div
          className="
            col-span-1
            md:col-span-2 
            md:row-span-1 
            bg-bright-purple
            min-h-[60px]
            md:min-h-0
          "
        />

        {/* Small Orange Block */}
        <div
          className="
            col-span-1
            md:col-span-3 
            md:row-span-1 
            bg-muted-orange
            min-h-[60px]
            md:min-h-0
          "
        />

        {/* Small Blue Block */}
        <div
          className="
            col-span-1
            md:col-span-2 
            md:row-span-1 
            bg-dark-blue
            min-h-[60px]
            md:min-h-0
          "
        />

        {/* Small Green Block */}
        <div
          className="
            col-span-2
            md:col-span-3 
            md:row-span-1 
            bg-muted-green
            min-h-[60px]
            md:min-h-0
          "
        />
      </div>
    </div>
  );
}
