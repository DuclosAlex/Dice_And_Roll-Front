'use client';

import Link from "next/link";
import userSlice from "@/redux/slice/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/UserInterace/user.interface";


const Navbar: React.FC = () => {

    const userState = useAppSelector((state) => state.userSlice);
    const [ userInfo, setUserInfo ] = useState<User | null>(null)


    useEffect(() => {
        if(userState.user[0]) {
            setUserInfo(userState.user[0]);
        }
    }, [])

    return (
        <div className="h-[16vh] w-9/12 m-auto">
            <h2 className="text-5xl font-bolder tracking-widest text-center pt-8 pb-6 border-b-2 border-black">Dice <span className="text-6xl text-blue-400">&</span> Roll</h2>
            <div className="flex">
                <ul className="flex h-[20%] w-full items-center justify-left">
                    <li className="p-4 text-2xl text-blue-500 font-semibold">
                        <Link href="/character">Personnages</Link>
                    </li>
                    <li className="p-4 text-2xl text-blue-500 font-semibold">
                        <Link href="/find-a-game">Trouver une partie</Link>
                    </li>
                    <li className="p-4 text-2xl text-blue-500 font-semibold">
                        <Link href="/new-game">Créer une partie</Link>
                    </li>
                    <li className="p-4 text-2xl text-blue-500 font-semibold">
                        <Link href="/blog">Blog</Link>
                    </li>
                </ul>

                {userInfo ? (
                        <Link href="/" className="text-2xl text-blue-500 font-semibold p-4">Déconnexion</Link>
                    ) : (
                        <Link href="/" className="text-2xl text-blue-500 font-semibold p-4">Connexion</Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;