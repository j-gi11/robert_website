import { Header } from '@/components/header';

export default function ResumePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground border-b-4 border-bright-purple pb-3 mb-6 inline-block">
              Resume
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-4">
              Placeholder content for Resume page. Highlight your skills, experience, and professional qualifications.
            </p>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Add your educational background, work experience, and technical skills here.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
