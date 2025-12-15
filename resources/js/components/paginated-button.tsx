import { PaginatedProps } from '@/types';
import React from 'react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { decode } from 'html-entities';

type Props = {
    pages: PaginatedProps<unknown>
}

const PaginatedButton = ({pages}: Props) => {
    return (
        <div className={"flex items-center justify-between"}>
            <p>Affichage des résultats {pages.meta.from} à {pages.meta.to} sur {pages.meta.total}</p>
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
