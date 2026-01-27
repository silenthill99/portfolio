import { Head, useForm, usePage } from '@inertiajs/react';
import React, { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {update} from '@/actions/App/Http/Controllers/StageController';
import { Stage } from '@/types';


const Edit = () => {

    const {stage} = usePage<{stage: Stage}>().props;

    const { data, setData, put, reset } = useForm<Required<Stage>>({
        id: stage.id,
        title: stage.title,
        entreprise: stage.entreprise,
        competences: stage.competences,
        start_at: stage.start_at ? stage.start_at.slice(0, 10) : new Date().toISOString().split('T')[0],
        end_at: stage.end_at ? stage.end_at.slice(0, 10) : "",
        objective: stage.objective
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(update({stage: stage}).url, {
            onFinish: () => reset()
        })
    }

    return (
        <div className={'flex min-h-screen flex-col items-center justify-center'}>
            <Head title={"Modifier l'article"} />
            <form action={update({ stage: stage }).url} method={'PUT'} className={'min-h-150 w-150 rounded-2xl bg-white p-10'} onSubmit={handleSubmit}>
                <label>Titre du post</label>
                <input
                    type={'text'}
                    name={'title'}
                    placeholder={'Titre du post'}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className={'my-2 block w-full border-b focus:outline-none'}
                    required
                />
                <br />
                <label>Entreprise</label>
                <input
                    type="text"
                    name={'entreprise'}
                    placeholder={"Nom de l'entreprise"}
                    className={'my-2 block w-full border-b focus:outline-none'}
                    value={data.entreprise}
                    onChange={(e) => {
                        setData('entreprise', e.target.value);
                    }}
                    required
                />
                <br />
                <div className={'flex justify-between'}>
                    <div>
                        <label className={'mb-2 block'}>Date de début</label>
                        <input
                            type="date"
                            name="start_at"
                            id="start_at"
                            value={data.start_at}
                            onChange={(e) => {
                                setData('start_at', e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label className={'mb-2 block'}>Date de fin</label>
                        <input
                            type="date"
                            name="end_at"
                            id="end_at"
                            value={data.end_at}
                            onChange={(e) => setData('end_at', e.target.value)}
                            required
                        />
                    </div>
                </div>{' '}
                <br />
                <label htmlFor={"objective"}>Objectifs</label>
                <textarea className={"block h-50 w-full resize-none border"} value={data.objective} onChange={e => setData('objective', e.target.value)}/>
                <br/>
                <label htmlFor="competences">Compétences ( à séparer avec un ";" )</label>
                <textarea
                    name="competences"
                    id="competences"
                    className={'block h-50 w-full resize-none border'}
                    value={data.competences}
                    onChange={(e) => setData('competences', e.target.value)}
                    required
                ></textarea>{' '}
                <br />
                <Button type={'submit'}>Valider</Button>
            </form>
        </div>
    );
};

export default Edit;
