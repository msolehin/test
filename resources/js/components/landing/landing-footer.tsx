import { Separator } from '@/components/ui/separator';
import { company, contact, navLinks } from './content';

export function LandingFooter() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-3">
                        <p className="text-base font-semibold text-foreground">
                            {company.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {company.intro}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-foreground">
                            Quick links
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="hover:text-foreground hover:underline"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-foreground">
                            Contact
                        </p>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <address className="not-italic">
                                {contact.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </address>
                            <p>
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                                    className="hover:text-foreground hover:underline"
                                >
                                    {contact.phone}
                                </a>
                            </p>
                            <p>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="hover:text-foreground hover:underline"
                                >
                                    {contact.email}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {company.name}. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
