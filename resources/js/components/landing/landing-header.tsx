import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { dashboard, login, register } from '@/routes';
import { company, navLinks } from './content';

export function LandingHeader() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const authButtons = (fullWidth: boolean) =>
        auth.user ? (
            <Button asChild className={fullWidth ? 'w-full' : undefined}>
                <Link href={dashboard()}>Dashboard</Link>
            </Button>
        ) : (
            <>
                <Button
                    variant="ghost"
                    asChild
                    className={fullWidth ? 'w-full' : undefined}
                >
                    <Link href={login()}>Log in</Link>
                </Button>
                <Button asChild className={fullWidth ? 'w-full' : undefined}>
                    <Link href={register()}>Register</Link>
                </Button>
            </>
        );

    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <a href="#top" className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <AppLogoIcon className="size-5 fill-current" />
                    </div>
                    <span className="truncate text-sm font-semibold">
                        {company.name}
                    </span>
                </a>

                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    {authButtons(false)}
                </div>

                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Open menu"
                            >
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>{company.name}</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                            <div className="flex flex-col gap-2 px-4">
                                {authButtons(true)}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
