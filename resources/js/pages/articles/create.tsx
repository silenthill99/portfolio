import React, { FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@headlessui/react';
import ArticleController from '@/actions/App/Http/Controllers/ArticleController';

type FormData = {
    title: string,
    link: string,
    github: string,
    image: File | null,
    description: string
}
const Create = () => {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post(ArticleController.store().url, {
            forceFormData: true,
            onFinish: ()=> reset()
        })
    }

    const [preview, setPreview] = useState<string | null>(null)

    const { data, setData, post, reset } = useForm<Required<FormData>>({
        title: '',
        link: '',
        github: '',
        image: null as File | null,
        description: ''
    })

    return (
        <div className={"min-h-screen flex flex-col items-center justify-center mx-auto bg-white"}>
            <h1>Ajouter un site web</h1>
            <Head title={"Créer un article"}/>
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
                    required
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

export default Create;
