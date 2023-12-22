"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import './login.css'

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            toast.success("Login success!")
            router.push("/profile")
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen">
            <h1 className="mb-2 underline font-bold">{loading ? "Processing" : "Login"}</h1>
            <div className="box_container flex flex-col items-center justify-center p-4 rounded">
                <hr />

                <label htmlFor="email">email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
                <label htmlFor="password">password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                <button
                    onClick={handleClick}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            </div>
            <Link href="/signup" className="underline font-medium mt-2">Don't have account? Signup here</Link>
        </div>
    )
}