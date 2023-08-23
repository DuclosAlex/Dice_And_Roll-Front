"use client";

import instance from "@/config/axios/axios";
import { useState } from "react";

const RegisterForm: React.FC = () => {

    const [ user, setUser ] = useState({
        email: "",
        password: "",
        pseudo: ""
    });

    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ buttonDisabled, setButtonDisabled ] = useState(false);

    const onRegister = async () => {

        try {

            const checkedPassword = verifyPassword();

            if(checkedPassword) {

                console.log(user);
                const response = await instance.post("/user/create", user)
                console.log(response.data)
            } else {
                alert("Les mots de passe ne sont pas identiques !")
            }

        } catch (error: any) {
            console.log(error.message)
        }
    }

    const verifyPassword = () => {
        let verifyPassword;

        if(user.password === confirmPassword) {
            verifyPassword = true;
        } else {
            verifyPassword = false;
        }

        return verifyPassword;
    }

    return (
        <form className="flex flex-col text-center p-8" action="" method="post">

            <label htmlFor="pseudo" className="mb-2">Nom d'utilisateur</label>
                <input 
                    type="text"
                    id="pseudo"
                    value={user.pseudo}
                    onChange={(e) => setUser({...user, pseudo: e.target.value})}
                    required
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto" 
                />

            <label htmlFor="text" className="mb-2">Email</label>
                <input 
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    required
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto" 
                />

            
            <label htmlFor="password" className="mb-2">Mot de passe</label>
            <input 
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                required
                className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto" 
            />

            <label htmlFor="confirmPassword" className="mb-2">Confirmer le mot de passe</label>
            <input 
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto" 
            />

            <button onClick={onRegister} className="bg-blue-500 p-3 font-bold text-white rounded-md w-1/3 m-auto mt-4 mb-8" type="button">Validez</button>
        </form>
    )
}

export default RegisterForm;