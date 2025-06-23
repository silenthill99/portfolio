import React, { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';

type FormProps = {
    title: string;
    entreprise: string;
    competences: string;
    start_at: string;
    end_at: string;
}

const Create = () => {

    const { data, setData, post, reset } = useForm<Required<FormProps>>({
        title: "",
        entreprise: "",
        competences: "",
        start_at: "",
        end_at: ""
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const start = new Date(data.start_at).getTime();
        if (data.end_at) {
            const end = new Date(data.end_at).getTime();
            if (end <= start) {
                alert("La date de fin ne doit pas être inférieure ou égale à celle de début")
                return;
            }
        }
        post(route('add.submit'), {
            onFinish: () => reset()
        })
    }
    return (
        <div className={"min-h-screen flex justify-center items-center"}>
            <Head title={"Ajouter un article"} />
            <form className={"bg-white w-150 h-150 rounded-2xl p-10"} method={"POST"} onSubmit={handleSubmit}>
                <label>Titre du post</label>
                <input type="text" name={"title"} placeholder={"Titre du post"} className={"block w-full border-b my-2 focus:outline-none"}
                       value={data.title} onChange={e => setData("title", e.target.value)} required/> <br/>

                <label>Entreprise</label>
                <input type="text" name={"entreprise"} placeholder={"Nom de l'entreprise"} className={"block w-full border-b my-2 focus:outline-none"} value={data.entreprise} onChange={e => setData("entreprise", e.target.value)} required/> <br/>
                <div className={"flex justify-between"}>
                    <div>
                        <label htmlFor="start_at" className={"mb-2 inline-block"}>Date de début</label><br/>
                        <input type="date" name="start_at" id="start_at" value={data.start_at} onChange={e => setData("start_at", e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="end_at" className={"mb-2 inline-block"}>Date de fin</label><br/>
                        <input type="date" name="end_at" id="end_at" value={data.end_at} onChange={e => setData("end_at", e.target.value)} />
                    </div>
                </div><br/>
                <textarea name="competences" id="competences" className={"block resize-none h-50 w-full border"} value={data.competences} onChange={e => setData("competences", e.target.value)} required></textarea> <br/>
                <Button type={"submit"}>Valider</Button>
            </form>
        </div>
    );
};

export default Create;
