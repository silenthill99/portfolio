import { Head, useForm, usePage } from '@inertiajs/react';
import React, { FormEvent } from 'react';
import { Button } from '@/components/ui/button';

type StageProps = {
    id: number,
    title: string,
    entreprise: string,
    competences: string,
    start_at: string,
    end_at: string
}

const Edit = () => {

    const {stage} = usePage<{stage: StageProps}>().props;

    const { data, setData, put, reset } = useForm<Required<StageProps>>({
        id: stage.id,
        title: stage.title,
        entreprise: stage.entreprise,
        competences: stage.competences,
        start_at: stage.start_at ? stage.start_at.slice(0, 10) : new Date().toISOString().split('T')[0],
        end_at: stage.end_at ? stage.end_at.slice(0, 10) : ""
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("stage.update", stage), {
            onFinish: () => reset()
        })
    }

    return (
        <div className={"min-h-screen flex flex-col items-center justify-center"}>
            <Head title={"Modifier l'article"}/>
            <form action={route('stage.update', stage)} method={"PUT"} className={"bg-white w-150 h-150 rounded-2xl p-10"} onSubmit={handleSubmit}>
                <label>Titre du post</label>
                <input
                    type={"text"}
                    name={"title"}
                    placeholder={"Titre du post"}
                    value={data.title}
                    onChange={e => setData("title", e.target.value)}
                    className={"block w-full border-b my-2 focus:outline-none"}
                    required
                /><br/>

                <label>Entreprise</label>
                <input
                    type="text"
                    name={"entreprise"}
                    placeholder={"Nom de l'entreprise"}
                    className={"block w-full border-b my-2 focus:outline-none"}
                    value={data.entreprise}
                    onChange={e => {setData("entreprise", e.target.value)}}
                    required
                /><br/>

                <div className={"flex justify-between"}>
                    <div>
                        <label className={"mb-2 block"}>Date de début</label>
                        <input
                            type="date"
                            name="start_at"
                            id="start_at"
                            value={data.start_at}
                            onChange={e => {setData("start_at", e.target.value)}}
                            required
                        />
                    </div>
                    <div>
                        <label className={"mb-2 block"}>Date de fin</label>
                        <input
                            type="date"
                            name="end_at"
                            id="end_at"
                            value={data.end_at}
                            onChange={e => setData("end_at", e.target.value)}
                            required
                        />
                    </div>
                </div> <br/>
                <textarea
                    name="competences"
                    id="competences"
                    className={"block resize-none h-50 w-full border"}
                    value={data.competences}
                    onChange={e => setData("competences", e.target.value)}
                    required></textarea> <br/>
                <Button type={"submit"}>Valider</Button>
            </form>
        </div>
    );
};

export default Edit;
