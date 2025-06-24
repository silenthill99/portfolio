import React, { FormEvent, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ArticleProps = {
    id: number;
    title: string;
    link: string;
    github: string;
    path: string;
    description: string;
    created_at: string;
    updated_at: string;
}

const Update = () => {

    const {article} = usePage<{article: ArticleProps}>().props

    const {data, setData, post, reset} = useForm({
        title: article.title,
        link: article.link,
        github: article.github,
        image: null as File | null,
        description: article.description,
    });

    const [preview, setPreview] = useState<string | null>("/storage/" + article.path);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(route("update", article.id), {
            onFinish: () => reset()
        })
    }

    return (
        <div className={"flex flex-col items-center justify-center bg-white"}>
            <h1>Modifier un article</h1>
            <Head title={"Modifier"}/>
            <form action="" method={"post"} encType={"multipart/form-data"} className={"border p-2 w-90.5 my-5"} onSubmit={handleSubmit}>
                <Label>Titre</Label>
                <Input
                    name={"title"}
                    placeholder={"Insérez un titre"}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                <br/>

                <Label>Lien</Label>
                <Input
                    name={"link"}
                    placeholder={"Insérez un lien"}
                    value={data.link}
                    onChange={(e) => setData("link", e.target.value)}
                    required
                />
                <br/>
                <Label>Lien github</Label>
                <Input
                    name={"github"}
                    placeholder={"GitHub du projet"}
                    value={data.github}
                    onChange={(e) => setData("github", e.target.value)}
                    required
                />
                <br/>
                <Label>Image</Label>
                <Input
                    name={"image"}
                    type={"file"}
                    accept={"image/*"}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setData('image', file);
                            setPreview(URL.createObjectURL(file))
                        }
                    }}
                />
                <br/>
                {preview && (
                    <>
                        <img src={preview} alt={"Preview"} className={"w-full rounded-md"}/>
                        <br/>
                    </>
                )}
                <Label>Description du projet</Label><br/>
                <Textarea
                    className={"border resize-none w-full min-h-100"}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                >
                </Textarea> <br/>
                <br/>
                <Button type={"submit"}>Valider</Button>
            </form>
        </div>
    );
};

export default Update;
