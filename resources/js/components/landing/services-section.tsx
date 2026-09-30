import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { services } from './content';
import { LandingSection } from './landing-section';

export function ServicesSection() {
    return (
        <LandingSection
            id="services"
            eyebrow="Services"
            title="What we do"
            description="End-to-end technology services for public-sector systems."
            className="bg-muted/40"
        >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map(({ title, description, icon: Icon }) => (
                    <Card
                        key={title}
                        className="transition-shadow hover:shadow-md"
                    >
                        <CardHeader>
                            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-5" />
                            </div>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </LandingSection>
    );
}
