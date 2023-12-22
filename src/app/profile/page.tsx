"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './profile.css'

export default function Profile() {
    const [username, setUsername] = useState("")
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/getdetails")
            res?setUsername(res.data.user.username):setUsername("")
            
        } catch (error: any) {
            return toast.error(error.message)
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="profile_box flex items-center justify-between">
                <div className="left w-2/4 flex items-center justify-center">
                    <h1 className="font-bold">Profile</h1>
                </div>
                <div className="right w-2/4 flex flex-col items-center justify-between">
                    <div className="profile_circle flex items-center justify-center">{username?username.charAt(0).toLocaleUpperCase():"U"}</div>
                    <button className="px-4 py-2 bg-red-600 rounded " onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}