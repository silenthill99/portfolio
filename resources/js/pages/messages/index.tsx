import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Message, PaginatedProps } from '@/types';
import PaginatedButton from '@/components/paginated-button';

const Index = () => {
    const {page} = usePage<{page: PaginatedProps<Message>}>().props;
    return (
        <AppLayout>
            <section>
                <PaginatedButton pages={page}/>
            </section>
        </AppLayout>
    );
};

export default Index;
