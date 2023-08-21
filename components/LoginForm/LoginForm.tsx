

const LoginForm: React.FC = () => {

    return (
        <form className="flex flex-col text-center p-8" action="" method="post">

            <label htmlFor="text" className="mb-2">Email</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    required
                    className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto" 
                />

            
            <label htmlFor="password" className="mb-2">Mot de passe</label>
            <input 
                type="password"
                id="password"
                name="password"
                required
                className="border-2 border-slate-800 p-1 rounded-md w-1/3 m-auto" 
            />

            <button className="bg-blue-500 p-3 font-bold text-white rounded-md w-1/3 m-auto mt-4 mb-8" type="button">Validez</button>
        </form>
    )
}

export default LoginForm;