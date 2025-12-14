import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout';
import { Message } from '@/types';

export default function Show() {
    const {message} = usePage<{message: Message}>().props
    return (
        <AppLayout>
            <Head title="show"/>
            <h1>{message.subject}</h1>
        </AppLayout>
    )
}
