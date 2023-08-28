'use client';

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useState } from "react";
import { motion as FramerMotion } from 'framer-motion';

const ConnectComponents: React.FC = () => {

    const [ isRegister, setIsRegister ] = useState(true);

    const handleRegisterSucces = () => {
        setIsRegister(false);
    };

    return (
        <div className="bg-gray-200 w-1/3 m-auto mt-5">
            { isRegister ? <RegisterForm onSucces={handleRegisterSucces}/> : <LoginForm />}

            <div className="w-1/2 m-auto pb-4 text-center text-lg">
                {isRegister ? 
                    <p>Se connectez ?  <span onClick={() => setIsRegister(!isRegister)} className="text-blue-500 cursor-pointer">C'est par ici !</span></p> :
                    <p>Pas encore inscrit ? <span onClick={() => setIsRegister(!isRegister)} className="text-blue-500 cursor-pointer">C'est par ici !</span></p>}       
            </div>
        </div>
    )
}

export default ConnectComponents;