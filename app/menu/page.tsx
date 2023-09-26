'use client'

import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/UserInterace/user.interface";
import GameAndCharacterContainer from "./components/GameAndCharacterContainer/GameAndCharacterContainer";

export default function Menu() {

    const userState = useAppSelector((state) => state.userSlice);
    const [ userInfo, setUserInfo ] = useState<User | null>(null);

    useEffect(() => {

        if(userState.user[0]) {
            setUserInfo(userState.user[0]);
        }
    }, [])

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    return (
        <div className="w-11/12 m-auto mt-10">
            <GameAndCharacterContainer />
        </div>
    )

}