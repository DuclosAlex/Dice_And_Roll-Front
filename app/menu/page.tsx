'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/UserInterace/user.interface";
import GameAndCharacterContainer from "./components/GameAndCharacterContainer/GameAndCharacterContainer";
import instance from "@/config/axios/axios";
import { useRouter } from "next/navigation";
import { logUser } from "@/redux/slice/userSlice";
import Cookies from 'js-cookie'

export default function Menu() {

    const userState = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch();
    const [ userInfo, setUserInfo ] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {

        async function checkAuthentification() {

            try {
                const response = await instance.get("/auth/check-auth", {
                    headers : {
                        "Authorization": `Bearer ${Cookies.get('jwt')}`,
                    }
                });

                if(response.status === 200) {
                    const user = response.data.user;
                    setUserInfo(user);
                    dispatch(logUser(user))
                } else {
                    router.push("/")
                }
            } catch(error) {
                console.log(error)
            }
        };

        checkAuthentification();
    }, [])

    return (
        <div className="w-11/12 m-auto mt-10">
            { userInfo ? (

                <GameAndCharacterContainer />
                ) : (
                    <div>Chargement en cours </div>
                )}
        </div>
    )

}