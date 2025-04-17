'use client'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Login() {
    const {login, logOut, error, loading} = useAuth() 
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    let router = useRouter();
    if (localStorage.getItem("token")) {
        router.push("/dashboard")
    }
    

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(phone, password)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md p-6 rounded-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                <form onSubmit={onSubmit} className="space-y-4">
                    <input 
                        onChange={(e) => setPhone(e.target.value)}   
                        type="text" 
                        placeholder="Phone Number" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)}   
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
