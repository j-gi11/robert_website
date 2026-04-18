import { Header } from '@/components/header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground border-b-4 border-muted-green pb-3 mb-6 inline-block">
              About Me
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-4">
              Placeholder content for About Me page. This is where you can showcase your background, experience, and what drives your passion for audio engineering and music production.
            </p>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Add more details about your journey, skills, and professional achievements here.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
