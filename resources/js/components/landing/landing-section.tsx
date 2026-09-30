import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type LandingSectionProps = {
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
    className?: string;
    children: ReactNode;
};

export function LandingSection({
    id,
    eyebrow,
    title,
    description,
    className,
    children,
}: LandingSectionProps) {
    return (
        <section
            id={id}
            className={cn('scroll-mt-20 py-16 sm:py-24', className)}
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-10 max-w-2xl space-y-3">
                    <p className="text-sm font-semibold tracking-wider text-primary uppercase">
                        {eyebrow}
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>
                {children}
            </div>
        </section>
    );
}
