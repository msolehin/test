import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { about } from './content';
import { LandingSection } from './landing-section';

export function AboutSection() {
    return (
        <LandingSection id="about" eyebrow="About us" title={about.heading}>
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-4 text-muted-foreground">
                    {about.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {about.values.map(({ title, description, icon: Icon }) => (
                        <Card key={title}>
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
            </div>
        </LandingSection>
    );
}
