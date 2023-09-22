'use client'
import { useAppSelector } from "@/redux/hooks";
import Navbar from "./components/Navbar/Navbar"
import { useEffect, useState } from "react";
import { User } from "@/interfaces/UserInterace/user.interface";

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
    }, [userInfo])

}