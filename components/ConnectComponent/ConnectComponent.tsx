'use client';

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useState } from "react";

const ConnectComponents: React.FC = () => {

    const [ isRegister, setIsRegister ] = useState(true);

    return (
        <div className="bg-gray-200 w-1/2 m-auto mt-5 text-center">
            { isRegister ? <RegisterForm /> : <LoginForm />}

            <div className="border-t-2 border-blue-500 pt-4 w-1/3 m-auto pb-4">
                {isRegister ? 
                    <p>Se connectez ?  <span onClick={() => setIsRegister(!isRegister)} className="text-blue-500 cursor-pointer">C'est par ici !</span></p> :
                    <p>Pas encore inscrit ? <span onClick={() => setIsRegister(!isRegister)} className="text-blue-500 cursor-pointer">C'est par ici !</span></p>}       
            </div>

        </div>
    )
}

export default ConnectComponents;