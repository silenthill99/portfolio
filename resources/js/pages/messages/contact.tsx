import React from 'react';
import { Form, Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/actions/App/Http/Controllers/MessageController';
import { LoaderCircleIcon } from 'lucide-react';
import InputError from '@/components/input-error';

const Contact = () => {

    return (
        <div className={'container mx-auto text-white'}>
            <Head title={'Me contacter'} />
            <h1>Me contacter</h1>
            <Form resetOnSuccess={true} {...store.form()} className={'mx-auto w-200 rounded-lg bg-white p-5 text-black'}>
                {({ errors, processing }) => (
                    <div className={'space-y-4'}>
                        <div>
                            <Label htmlFor={'pseudo'}>Votre pseudo</Label>
                            <Input type={'text'} placeholder={'Votre pseudo'} name={'pseudo'} id={'pseudo'} aria-invalid={!!errors.pseudo}/>
                            {errors.pseudo && <InputError message={errors.pseudo} />}
                        </div>
                        <div>
                            <Label htmlFor={'email'}>Votre mail</Label>
                            <Input type={'email'} placeholder={'Votre adresse mail'} name={'email'} id={'email'} aria-invalid={!!errors.email} />
                            {errors.email && <InputError message={errors.email} />}
                        </div>
                        <div>
                            <Label htmlFor={'subject'}>Sujet de votre demande</Label>
                            <Input type={'text'} placeholder={'Sujet de votre demande'} name={'subject'} id={'subject'} aria-invalid={!!errors.subject} />
                            {errors.subject && <InputError message={errors.subject} />}
                        </div>
                        <div>
                            <Label htmlFor={'message'}>Votre message</Label>
                            <Textarea className={'h-100 w-full resize-none border'} name={'message'} id={'message'} aria-invalid={!!errors.message} />
                            {errors.message && <InputError message={errors.message} />}
                        </div>
                        <Button type={'submit'}>
                            <span>Envoyer</span>
                            {processing && <LoaderCircleIcon className={'animate-spin'} />}
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Contact;
