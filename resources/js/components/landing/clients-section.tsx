import { Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { clients, projects } from './content';
import { LandingSection } from './landing-section';

export function ClientsSection() {
    return (
        <LandingSection
            id="clients"
            eyebrow="Clients & projects"
            title="Trusted by Malaysian government"
            description="Ministries and agencies rely on our systems every day."
        >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {clients.map((client) => (
                    <div
                        key={client.name}
                        className="flex flex-col gap-2 rounded-lg border bg-card p-4"
                    >
                        <Building2 className="size-5 text-primary" />
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {client.sector}
                        </p>
                    </div>
                ))}
            </div>

            <h3 className="mt-14 mb-6 text-xl font-semibold tracking-tight">
                Selected projects
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.title}>
                        <CardHeader>
                            <Badge variant="outline" className="w-fit">
                                {project.client}
                            </Badge>
                            <CardTitle className="pt-2">
                                {project.title}
                            </CardTitle>
                            <CardDescription>{project.summary}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </LandingSection>
    );
}
