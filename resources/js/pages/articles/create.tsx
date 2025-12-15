import React, { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ArticleController from '@/actions/App/Http/Controllers/ArticleController';
const Create = () => {

    const [preview, setPreview] = useState<string | null>(null)


    return (
        <div className={"min-h-screen flex flex-col items-center justify-center mx-auto bg-white"}>
            <h1>Ajouter un site web</h1>
            <Head title={"Créer un article"}/>
            <Form className={"border p-2 w-90.5 my-5"} {...ArticleController.store.form()}>
                <Label htmlFor={"title"}>Titre</Label>
                <Input
                    id={"title"}
                    name={"title"}
                    placeholder={"Insérez un titre"}
                />
                <br/>

                <Label htmlFor={"link"}>Lien</Label>
                <Input
                    id={"link"}
                    name={"link"}
                    placeholder={"Insérez un lien"}
                />
                <br/>
                <Label htmlFor={"github"}>Lien github</Label>
                <Input
                    id={"github"}
                    name={"github"}
                    placeholder={"GitHub du projet"}
                />
                <br/>
                <Label htmlFor={"image"}>Image</Label>
                <Input
                    id={"image"}
                    name={"image"}
                    type={"file"}
                    accept={"image/*"}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
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
                <Label htmlFor={"description"}>Description du projet</Label><br/>
                <Textarea
                    className={"border resize-none w-full min-h-100"}
                    name={"description"}
                    id={"description"}
                >
                </Textarea> <br/>
                <br/>
                <Button type={"submit"}>Valider</Button>
            </Form>
        </div>
    );
};

export default Create;
