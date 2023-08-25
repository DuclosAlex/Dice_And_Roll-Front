import instance from "@/config/axios/axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterForm: React.FC = () => {

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
            console.log("values", values)
            const response = await instance.post('/user/create', values);
            console.log(response.data)
        } catch(error: any) {
            console.log(error.message)
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
            <Form className="flex flex-col text-center p-8">
                <label htmlFor="pseudo" className="mb-2">Nom d'utilisateur</label>
                <Field
                    type="text"
                    name="pseudo"
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto"
                />
                {touched.pseudo && errors.pseudo ?
                <ErrorMessage
                    name="pseudo"
                    component="div"
                    className="text-red-500"
                /> : null }

                <label htmlFor="email" className="mb-2">Email</label>
                <Field
                    type="text"
                    name="email"
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto"
                />
                {touched.email && errors.email ?
                <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                /> : null }

                <label htmlFor="password" className="mb-2">Mot de passe</label>
                <Field
                    type="password"
                    name="password"
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto"
                />
                {touched.password && errors.password ?
                <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                /> : null }

                <label htmlFor="confirmPassword" className="mb-2">Confirmer le mot de passe</label>
                <Field
                    type="password"
                    name="confirmPassword"
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto"
                />
                {touched.confirmPassword && errors.confirmPassword ?
                <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                /> : null }

                <button type="submit" className="bg-blue-500 p-3 font-bold text-white rounded-md w-1/3 m-auto mt-4 mb-8">Validez</button>
            </Form>
            );
        }}
        </Formik>
    )
}

export default RegisterForm;