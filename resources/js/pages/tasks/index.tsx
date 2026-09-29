import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';

export default function Index() {
    return (
        <>
            <Head title="Tasks" />
            <div className="px-4 py-6">
                <Heading title="Tasks" description="Keep track of what needs doing" />
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Tasks',
            href: '/tasks',
        },
    ],
};
