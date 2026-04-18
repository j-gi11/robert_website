import { Header } from '@/components/header';

export default function LiveRecordingsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground border-b-4 border-deep-red pb-3 mb-6 inline-block">
              Live Recordings
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-4">
              Placeholder content for Live Recordings page. Showcase your live performance recordings and events.
            </p>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Feature your live performances, concert recordings, and special event audio projects.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
