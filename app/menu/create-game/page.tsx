'use client'
import { useAppSelector } from '@/redux/hooks';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { User } from '@/interfaces/UserInterace/user.interface';
import * as Yup from 'yup';

export default function CreateGamePage() {

    const user = useAppSelector((state) => state.userSlice.user[0]);

    const [ userInfo, setUserInfo ] = useState<User | null>(null);
    
    const CreateGamesSchema = Yup.object().shape({
        name: Yup.string().required('Le nom de la partie est requise !'),
        max_players: Yup.number()
            .required('Le nombre de joueurs est requis !')
            .min(2, 'Le nombre de joueurs ne peut pas être inférieur à 2 !')
            .integer('Le nombre de joueur doit être un entier !'),
        description: Yup.string().required('Vous devez donnez une description de votre partie !')
    });

    const initialValues = {
        name: "",
        max_players: 2,
        description: ""
    }

    useEffect(() => {

        if(user) {
            setUserInfo(user);
        }
    }, [])

    return (
        <div>
            <div className="border-4 border-blue-400 w-4/5 m-auto mt-4">
                <ol className='list-decimal list-inside w-1/2 m-auto text-center mb-6 mt-8'>
                    <h3 className='text-3xl font-bold mb-4'>Quelques bases avant de commencer !</h3>
                    <li className='text-center text-xl underline underline-offset-8 decoration-blue-300 decoration-4 mb-4'>Pensez à donnez un nom à votre partie qui en refléte le contenue !</li>
                    <li className='text-center text-xl underline underline-offset-8 decoration-blue-300 decoration-4 mb-4'>La description aidera les autres joueurs à comprendre le but de la partie !</li>
                    <li className='text-center text-xl underline underline-offset-8 decoration-blue-300 decoration-4 mb-4'>Soyez raisonnable sur le nombre de joueurs maximum, au risque de perturber votre partie !</li>
                    <li className='text-center text-xl underline underline-offset-8 decoration-blue-300 decoration-4 mb-4'>Nous rappellons que toutes les termes ou propos injurieux sont interdits, jouons dans le respect de chacun !</li>
                </ol>

                <Formik
                    initialValues={initialValues}
                    validationSchema={CreateGamesSchema}
                    onSubmit={() => console.log("hello")}
                >
                    {({errors, touched}) => {
                        return (
                            <Form className='p-8'>
                                <h2 className=' text-3xl text-center underline'>Créer votre partie !</h2>

                                <div className='mt-6 flex justify-around mb-4'>
                                    <div className='flex flex-col w-1/4'>
                                        <label htmlFor='name' className='mb-2 text-xl text-center font-semibold'>Nom de la partie</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="outline outline-blue-300"
                                            />
                                    </div>

                                    <div className='flex flex-col w-1/4'>
                                        <label htmlFor='max_players' className='mb-2 text-xl font-semibold text-center'>Nombre de joueurs </label>
                                        <Field
                                            type="number"
                                            name="max_players"
                                            className="outline outline-blue-300 w-[40px] text-center mx-auto"
                                        />
                                    </div>        
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor='description' className='mb-2 text-xl font-semibold text-center'>Description de la partie</label>
                                    <Field 
                                        as="textarea"
                                        name="description"
                                        className="outline outline-blue-300 p-2 w-1/2 m-auto"
                                    />
                                </div>
                                <div className='w-1/3 m-auto text-center mt-6'>

                                <button type="submit" className="bg-blue-500 p-3 font-bold text-white rounded-md w-1/3 mt-4">Validez</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}