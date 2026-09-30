import { Head } from '@inertiajs/react';
import { AboutSection } from '@/components/landing/about-section';
import { ClientsSection } from '@/components/landing/clients-section';
import { company } from '@/components/landing/content';
import { ContactSection } from '@/components/landing/contact-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHeader } from '@/components/landing/landing-header';
import { LandingHero } from '@/components/landing/landing-hero';
import { ServicesSection } from '@/components/landing/services-section';

export default function Welcome() {
    return (
        <>
            <Head title={company.name}>
                <meta name="description" content={company.intro} />
            </Head>
            <div className="min-h-screen bg-background text-foreground">
                <LandingHeader />
                <main>
                    <LandingHero />
                    <AboutSection />
                    <ServicesSection />
                    <ClientsSection />
                    <ContactSection />
                </main>
                <LandingFooter />
            </div>
        </>
    );
}
