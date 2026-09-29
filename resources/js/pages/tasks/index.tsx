import { Form, Head, router } from '@inertiajs/react';
import { Check, ListTodo, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import TaskController from '@/actions/App/Http/Controllers/TaskController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { index } from '@/routes/tasks';
import type { Task } from '@/types';

function DeleteTask({ task }: { task: Task }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete task: ${task.title}`}
                >
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete task?</DialogTitle>
                <DialogDescription className="break-words">
                    “{task.title}” will be permanently deleted.
                </DialogDescription>
                <Form
                    {...TaskController.destroy.form(task.id)}
                    options={{ preserveScroll: true }}
                    onSuccess={() => setOpen(false)}
                >
                    {({ processing }) => (
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                type="submit"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Delete
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function TaskRow({ task }: { task: Task }) {
    const [editing, setEditing] = useState(false);
    const [pending, setPending] = useState(false);
    const done = task.completed_at !== null;

    const toggle = () =>
        router.patch(
            TaskController.toggle.url(task.id),
            {},
            {
                preserveScroll: true,
                onStart: () => setPending(true),
                onFinish: () => setPending(false),
            },
        );

    if (editing) {
        return (
            <li className="border-b py-3 last:border-0">
                <Form
                    {...TaskController.update.form(task.id)}
                    options={{ preserveScroll: true }}
                    onSuccess={() => setEditing(false)}
                    className="flex flex-col gap-2 sm:flex-row sm:items-start"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid min-w-0 flex-1 gap-2">
                                <Label
                                    htmlFor={`title-${task.id}`}
                                    className="sr-only"
                                >
                                    Task title
                                </Label>
                                <Input
                                    id={`title-${task.id}`}
                                    name="title"
                                    type="text"
                                    defaultValue={task.title}
                                    required
                                    maxLength={255}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            setEditing(false);
                                        }
                                    }}
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? <Spinner /> : <Check />}
                                    Save
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </li>
        );
    }

    return (
        <li
            className={`flex items-center gap-3 border-b py-3 last:border-0 ${done ? 'opacity-60' : ''}`}
        >
            <Checkbox
                checked={done}
                onCheckedChange={toggle}
                disabled={pending}
                aria-label={
                    done
                        ? `Mark "${task.title}" as not done`
                        : `Mark "${task.title}" as done`
                }
            />
            <span
                className={`min-w-0 flex-1 text-sm break-words ${done ? 'text-muted-foreground line-through' : ''}`}
            >
                {task.title}
            </span>
            <div className="flex shrink-0 items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Edit task: ${task.title}`}
                    onClick={() => setEditing(true)}
                >
                    <Pencil />
                </Button>
                <DeleteTask task={task} />
            </div>
        </li>
    );
}

function Section({
    title,
    tasks,
    empty,
}: {
    title: string;
    tasks: Task[];
    empty?: string;
}) {
    return (
        <section className="space-y-1">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">{title}</h3>
                <Badge variant="secondary">{tasks.length}</Badge>
            </div>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </ul>
            ) : (
                <p className="py-3 text-sm text-muted-foreground">{empty}</p>
            )}
        </section>
    );
}

export default function Index({ tasks }: { tasks: Task[] }) {
    const open = tasks.filter((task) => task.completed_at === null);
    const done = tasks.filter((task) => task.completed_at !== null);

    return (
        <>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Tasks"
                    description="Keep track of what you need to do"
                />

                <Card>
                    <CardContent>
                        <Form
                            {...TaskController.store.form()}
                            resetOnSuccess
                            options={{ preserveScroll: true }}
                            className="flex flex-col gap-2 sm:flex-row sm:items-start"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid flex-1 gap-2">
                                        <Label
                                            htmlFor="title"
                                            className="sr-only"
                                        >
                                            New task
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            required
                                            maxLength={255}
                                            placeholder="What needs to be done?"
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? <Spinner /> : <Plus />}
                                        Add task
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        {tasks.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 py-10 text-center">
                                <ListTodo className="size-10 text-muted-foreground" />
                                <p className="font-medium">No tasks yet</p>
                                <p className="text-sm text-muted-foreground">
                                    Add your first task above.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Section
                                    title="Open"
                                    tasks={open}
                                    empty="All done! Nothing left to do."
                                />
                                {done.length > 0 && (
                                    <>
                                        <Separator />
                                        <Section title="Done" tasks={done} />
                                    </>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Tasks',
            href: index(),
        },
    ],
};
