import instance from "@/config/axios/axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { motion } from "framer-motion";

interface RegisterFormProps {
    onSucces: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSucces}) => {

    const [backEndSendError, setBackEndSendError ] = useState('');
    const [ notificationVisible, setNotificationVisible ] = useState(false);

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        pseudo: ''
    };

    const getCharacterValidationError = (str: string) => {
        return `Votre mot de passe doit contenir au moins 1 ${str} `
    }

    const RegisterSchema = Yup.object().shape({
        pseudo: Yup.string().min(3, 'Trop court !').max(25, 'Trop Long !').required('Obligatoire !'),
        email: Yup.string().email('Email Invalide').required('Required'),
        password: Yup.string()
            .required("Un mot de passe est obligatoire !")
            .min(8, 'Votre mot de passe doit faire 8 caractère minimum !')
            .matches(/[0-9]/, getCharacterValidationError("chiffre"))
            .matches(/[a-z]/, getCharacterValidationError('lettre minuscule'))
            .matches(/[A-Z]/, getCharacterValidationError('lettre majuscule')),
        confirmPassword: Yup.string()
            .required('Confirmer votre mot de passe !')
            .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas !")
    })

    const onSubmit = async  (values: any) => {

        try {
            await instance.post('/user/create', values);
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
                onSucces();
            }, 3000)
        } catch(error: any) {
            if(error.response) {
                setBackEndSendError(error.response.data.error);
            } else {
                console.log("erreur côté client", error.message)
            }
        }
    };

    return (
        
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={RegisterSchema}
        >
            {({errors, touched}) => {
                return (
            <Form className="flex flex-col p-8 pb-2 w-full relative">

                     {/* TODO: Had to work on succes notification} */}
                <motion.div
                    className="text-center mb-6 bg-blue-600 text-white p-4 rounded-lg absolute top-[10px] right-[-250px]"
                    initial={{ opacity: 0, y: -10}}
                    animate={{ opacity: notificationVisible ? 1 : 0, y: 0}}
                    exit={{ opacity: 0, y: -10}}
                    transition={{ duration: 0.3}}
                    >
                        <p>Inscription réussie</p>
                    </motion.div>

                <h2 className="text-center text-black text-3xl font-semibold mb-6">Formulaire d'inscription</h2>

                {backEndSendError ? 
                    <div className="text-center mb-6">
                        <p className="text-red-600 text-lg">{backEndSendError}</p>
                    </div>    
                : null}
                <div className="w-4/5 flex flex-col m-auto mb-6">
                    <label htmlFor="pseudo" className="mb-2 text-xl font-semibold">Nom d'utilisateur</label>
                    <Field
                        type="text"
                        name="pseudo"
                        className={`${ errors.pseudo && touched.pseudo? "border-red-500 border-2" : "border-slate-800 border-2"} p-1 rounded-md m-auto w-full`}
                        />
                    {touched.pseudo && errors.pseudo ?
                    <ErrorMessage
                    name="pseudo"
                    component="div"
                    className="text-red-500 mt-2 font-semibold"
                    /> : null }
                </div>

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


                <div className="w-4/5 flex flex-col m-auto mb-6">
                    <label htmlFor="confirmPassword" className="mb-2 text-xl font-semibold">Confirmer le mot de passe</label>
                    <Field
                        type="password"
                        name="confirmPassword"
                        className={`${ errors.confirmPassword && touched.confirmPassword ? "border-red-500 border-2" : "border-slate-800 border-2"} p-1 rounded-md m-auto w-full`}
                        />
                    {touched.confirmPassword && errors.confirmPassword ?
                    <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 mt-2 font-semibold"
                    /> : null }
                </div>

                <button type="submit" className="bg-blue-500 p-3 font-bold text-white rounded-md w-full m-auto mt-4">Validez</button>
            </Form>
            );
        }}
        </Formik>
    )
}

export default RegisterForm;