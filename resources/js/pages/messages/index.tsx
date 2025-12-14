import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import { Message, PaginatedProps } from '@/types';
import PaginatedButton from '@/components/paginated-button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { show } from '@/routes/messages';

const Index = () => {
    const {messages} = usePage<{messages: PaginatedProps<Message>}>().props;
    return (
        <AppLayout>
            <div className={'m-2 grid gap-2 md:grid-cols-3'}>
                {messages.data.map((message) => (
                    <Link href={show({message: message})} key={message.id}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{message.subject}</CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
            <section>
                <PaginatedButton pages={messages} />
            </section>
        </AppLayout>
    );
};

export default Index;
