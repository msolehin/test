import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { company, stats } from './content';

export function LandingHero() {
    return (
        <section
            id="top"
            className="bg-gradient-to-b from-muted/50 to-background"
        >
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
                <div className="flex max-w-3xl flex-col items-start gap-6">
                    <Badge variant="secondary">{company.tagline}</Badge>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        {company.name}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {company.intro}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button size="lg" asChild>
                            <a href="#services">
                                Our services <ArrowRight />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="#contact">Contact us</a>
                        </Button>
                    </div>
                </div>

                <dl className="mt-16 grid grid-cols-2 gap-8 border-t pt-8 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <dt className="text-3xl font-semibold">
                                {stat.value}
                            </dt>
                            <dd className="mt-1 text-sm text-muted-foreground">
                                {stat.label}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
