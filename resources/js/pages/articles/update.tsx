import React, { useState } from 'react';
import { Form, Head, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Article } from '@/types';
import InputError from '@/components/input-error';
import storage from '@/routes/storage';
import { update } from '@/actions/App/Http/Controllers/ArticleController';

const Update = () => {

    const {article} = usePage<{article: Article}>().props


    const [preview, setPreview] = useState<string | null>(storage.local(article.path).url);


    return (
        <div className={'flex flex-col items-center justify-center bg-white'}>
            <h1>Modifier un article</h1>
            <Head title={'Modifier'} />
            <Form {...update.form({ article: article })} resetOnSuccess={true} className={'my-5 w-90.5 border p-2'}>
                {({ errors }) => (
                    <div className={'space-y-4'}>
                        <div>
                            <Label htmlFor={'title'}>Titre</Label>
                            <Input id={'title'} name={'title'} placeholder={'Insérez un titre'} defaultValue={article.title} />
                            {errors.title && <InputError message={errors.title} />}
                        </div>
                        <div>
                            <Label htmlFor={'link'}>Lien</Label>
                            <Input id={'link'} name={'link'} placeholder={'Insérez un lien'} defaultValue={article.link} />
                            {errors.link && <InputError message={errors.link} />}
                        </div>
                        <div>
                            <Label htmlFor={'github'}>Lien github</Label>
                            <Input id={'github'} name={'github'} placeholder={'GitHub du projet'} defaultValue={article.github} />
                            {errors.github && <InputError message={errors.github} />}
                        </div>
                        <div>
                            <Label htmlFor={'image'}>Image</Label>
                            <Input
                                id={'image'}
                                name={'image'}
                                type={'file'}
                                accept={'image/*'}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {errors.image && <InputError message={errors.image} />}
                        </div>
                        {preview && <img src={preview} alt={'Preview'} className={'w-full rounded-md'} />}
                        <div>
                            <Label htmlFor={'description'}>Description du projet</Label>
                            <Textarea
                                id={'description'}
                                name={'description'}
                                className={'min-h-100 w-full resize-none border'}
                                defaultValue={article.description}
                            ></Textarea>
                            {errors.description && <InputError message={errors.description} />}
                        </div>
                        <Button type={'submit'}>Valider</Button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Update;
