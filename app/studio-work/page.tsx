import { Header } from '@/components/header';

export default function StudioWorkPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground border-b-4 border-deep-red pb-3 mb-6 inline-block">
              Studio Work
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-4">
              Placeholder content for Studio Work page. Feature your studio recordings and production credits.
            </p>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Showcase your professional studio projects, production work, and audio engineering credits.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
