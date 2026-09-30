import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { contact } from './content';
import { LandingSection } from './landing-section';

const linkClass = 'hover:text-foreground hover:underline';

export function ContactSection() {
    const items = [
        {
            title: 'Address',
            icon: MapPin,
            body: (
                <address className="not-italic">
                    {contact.address.map((line) => (
                        <span key={line} className="block">
                            {line}
                        </span>
                    ))}
                </address>
            ),
        },
        {
            title: 'Phone / Fax',
            icon: Phone,
            body: (
                <>
                    <p>
                        Tel:{' '}
                        <a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className={linkClass}
                        >
                            {contact.phone}
                        </a>
                    </p>
                    <p>Fax: {contact.fax}</p>
                </>
            ),
        },
        {
            title: 'Email',
            icon: Mail,
            body: (
                <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                </a>
            ),
        },
        {
            title: 'Business hours',
            icon: Clock,
            body: <p>{contact.hours}</p>,
        },
    ];

    return (
        <LandingSection
            id="contact"
            eyebrow="Contact"
            title="Get in touch"
            description="Talk to us about your next project."
            className="bg-muted/40"
        >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map(({ title, icon: Icon, body }) => (
                    <Card key={title}>
                        <CardHeader>
                            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-5" />
                            </div>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            {body}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </LandingSection>
    );
}
