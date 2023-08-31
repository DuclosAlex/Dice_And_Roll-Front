import { Formik, Field, ErrorMessage, Form } from "formik";
import instance from "@/config/axios/axios";
import * as Yup from 'yup';
import { useState } from "react";


const LoginForm: React.FC = () => {

    const [backEndSendError, setBackEndSendError] = useState('');

    const initialValues = {
        email: '',
        password: ''
    };

    const getCharacterValidationError = (str: string) => {
        return `Votre mot de passe doit contenir au moins 1 ${str} `
    }

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email Invalide').required('Required'),
        password: Yup.string()
            .required("Un mot de passe est obligatoire !")
            .min(8, 'Votre mot de passe doit faire 8 caractère minimum !')
            .matches(/[0-9]/, getCharacterValidationError("chiffre"))
            .matches(/[a-z]/, getCharacterValidationError('lettre minuscule'))
            .matches(/[A-Z]/, getCharacterValidationError('lettre majuscule')),
    });

    const onSubmit = async (values: any) => {

        try {
            const response = await instance.post('/user/login', values);
            console.log(response.data);
        } catch(error: any) {
            if(error.response) {
           setBackEndSendError(error.response.data.error);     
            } else {
                setBackEndSendError("Erreur du site, désolé !");
            }
        }
    };

    return (
        
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={LoginSchema}
        >
            {({errors, touched}) => {
                return (
                    <Form className="flex flex-col p-8 pb-2 w-full">

                        <h2 className="text-center text-black text-3xl font-semibold">Formulaire de connexion</h2>

                        {backEndSendError ? 
                            <div className="text-center mb-6">
                                <p className="text-red-600 text-lg">{backEndSendError}</p>
                            </div>    
                        : null}

                        <div className="w-4/5 flex flex-col m-auto mb-6">
                            <label htmlFor="email" className="mb-2 text-xl font-semibold">Email</label>
                            <Field
                                type="text"
                                name="email"
                                className={`${ errors.email && touched.email ? "border-red-500 border-2" : "border-slate-800 border-2"} p-1 rounded-md m-auto w-full`}
                            />
                            {touched.email && errors.email ?
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 mt-2 font-semibold"
                            /> : null }
                        </div>

                        <div className="w-4/5 flex flex-col m-auto mb-6">
                            <label htmlFor="password" className="mb-2 text-xl font-semibold">Mot de passe</label>
                            <Field
                                type="password"
                                name="password"
                                className={`${ errors.password && touched.password ? "border-red-500 border-2" : "border-slate-800 border-2"} p-1 rounded-md m-auto w-full`}
                                />
                            {touched.password && errors.password ?
                            <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 mt-2 font-semibold"
                            /> : null }
                        </div>

                        <button type="submit" className="bg-blue-500 p-3 font-bold text-white rounded-md w-full m-auto mt-4">Validez</button>
                    </Form>
                )
            }}
        </Formik>

    )
}

export default LoginForm;