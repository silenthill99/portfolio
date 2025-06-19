import React, { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type FormProps = {
    pseudo: string;
    email: string;
    subject: string;
    message: string;
}

const Contact = () => {

    const { data, setData, post, reset } = useForm<Required<FormProps>>({
        pseudo: "",
        email: "",
        subject: "",
        message: ""
    })

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("contact.submit"), {
            onFinish: () => reset()
        })
    }

    return (
        <div className={"container mx-auto"}>
            <Head title={"Nous contacter"}/>
            <h1>Nous contacter</h1>
            <form action="" method={"POST"} onSubmit={handleSubmit} className={"bg-white p-5 w-200 rounded-lg mx-auto text-black"}>
                <Label>Votre pseudo</Label>
                <Input
                    type={"text"}
                    placeholder={"Votre pseudo"}
                    name={"pseudo"}
                    id={"pseudo"}
                    value={data.pseudo}
                    onChange={(e) => setData("pseudo", e.target.value)}
                    required
                />
                <br/>
                <Label>Votre mail</Label>
                <Input
                    type={"email"}
                    placeholder={"Votre adresse mail"}
                    name={"email"}
                    id={"email"}
                    value={data.email}
                    onChange={e => setData("email", e.target.value)}
                    required
                />
                <br/>
                <Label>Sujet de votre demande</Label>
                <Input
                    type={"text"}
                    placeholder={"Sujet de votre demande"}
                    name={"subject"}
                    id={"subject"}
                    value={data.subject}
                    onChange={e => setData("subject", e.target.value)}
                    required
                />
                <br/>
                <Label>Votre message</Label>
                <Textarea
                    className={"w-full h-100 border resize-none"}
                    name={"message"}
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    required
                />
                <br/>
                <Button type={"submit"}>Envoyer</Button>
            </form>
        </div>
    );
};

export default Contact;
