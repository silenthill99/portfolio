import StageController from '@/actions/App/Http/Controllers/StageController';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type FormProps = {
    title: string;
    entreprise: string;
    competences: string;
    start_at: string;
    end_at: string;
    objective: string;
};

const Create = () => {
    const { data, setData, post, reset, errors } = useForm<Required<FormProps>>({
        title: '',
        entreprise: '',
        competences: '',
        start_at: '',
        end_at: '',
        objective: ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const start = new Date(data.start_at).getTime();
        if (data.end_at) {
            const end = new Date(data.end_at).getTime();
            if (end <= start) {
                alert('La date de fin ne doit pas être inférieure ou égale à celle de début');
                return;
            }
        }
        post(StageController.store().url, {
            onFinish: () => reset(),
        });
    };
    return (
        <div className={'flex min-h-screen items-center justify-center'}>
            <Head title={'Ajouter un article'} />
            <form className={'min-h-150 w-150 rounded-2xl bg-white p-10'} method={'POST'} onSubmit={handleSubmit}>
                <label>Titre du post</label>
                <input
                    type="text"
                    name={'title'}
                    placeholder={'Titre du post'}
                    className={'my-2 block w-full border-b focus:outline-none'}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                {errors.title && (
                    <p>{errors.title}</p>
                )}
                <br />
                <label>Entreprise</label>
                <input
                    type="text"
                    name={'entreprise'}
                    placeholder={"Nom de l'entreprise"}
                    className={'my-2 block w-full border-b focus:outline-none'}
                    value={data.entreprise}
                    onChange={(e) => setData('entreprise', e.target.value)}
                    required
                />
                {errors.entreprise && (
                    <p>{errors.entreprise}</p>
                )}
                <br />
                <div className={'flex justify-between'}>
                    <div>
                        <label htmlFor="start_at" className={'mb-2 inline-block'}>
                            Date de début
                        </label>
                        <br />
                        <input
                            type="date"
                            name="start_at"
                            id="start_at"
                            value={data.start_at}
                            onChange={(e) => setData('start_at', e.target.value)}
                            required
                        />
                        {errors.start_at && (
                            <p>{errors.start_at}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="end_at" className={'mb-2 inline-block'}>
                            Date de fin
                        </label>
                        <br />
                        <input type="date" name="end_at" id="end_at" value={data.end_at} onChange={(e) => setData('end_at', e.target.value)} />
                        {errors.end_at && (
                            <p>{errors.end_at}</p>
                        )}
                    </div>
                </div>
                <br />
                <label htmlFor="objective">Objectifs</label>
                <textarea
                    name={'objective'}
                    id={'objective'}
                    className={"block h-50 w-full resize-none border"}
                    value={data.objective}
                    onChange={e => setData('objective', e.target.value)}
                    required
                />
                {errors.objective && (
                    <p>{errors.objective}</p>
                )}
                <label htmlFor="competences">Compétences ( à séparer avec un ";" )</label>
                <textarea
                    name="competences"
                    id="competences"
                    className={'block h-50 w-full resize-none border'}
                    value={data.competences}
                    onChange={(e) => setData('competences', e.target.value)}
                    required
                ></textarea>
                {errors.competences && (
                    <p>{errors.competences}</p>
                )}
                <br />
                <Button type={'submit'}>Valider</Button>
            </form>
        </div>
    );
};

export default Create;
