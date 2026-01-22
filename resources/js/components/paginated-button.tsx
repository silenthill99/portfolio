import { PaginatedProps } from '@/types';
import React from 'react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { decode } from 'html-entities';
import { cn } from '@/lib/utils';

type Props = {
    pages: PaginatedProps<unknown>,
    className?: string
}

const PaginatedButton = ({pages, className}: Props) => {
    return (
        <div className={cn('flex items-center justify-between', className)}>
            <p>
                Affichage des résultats {pages.meta.from} à {pages.meta.to} sur {pages.meta.total}
            </p>
            <div>
                {pages.meta.links.map((page, index) => (
                    <Button key={index} disabled={page.active || !page.url} onClick={() => router.visit(page.url || '')}>
                        {decode(page.label)}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default PaginatedButton;
