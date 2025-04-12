"use client";
import { User } from '@/interface/User';
import { baseUrl } from '@/utils/url';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function useAuth() {
    const [userinlogin, setUserinLogin] = useState<User | null>(null) // this is to set user
    const [error, setError] = useState<string>("")// this to set error
    const [loading, setLoading] = useState<boolean>(false) // this to set loading 
    const router = useRouter()//this is to push user when status is perfect




    ///////////////////////////////////////

    async function login(phone:string, password:string){

        try {
            let res = await axios.post(baseUrl + "auth/login/",{
                phone,
                password    
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                router.push("/dashboard")
                localStorage.setItem ("token",res.data.token)
            }
            console.log(res);
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    ///////////////////////////////////////
    async function Register( password:string,name:string, phone:string,){
        try {
            let res = await axios.post(baseUrl + "auth/register-library/",{
                password,
                name,
                phone,
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.status);
            console.log('Response data:', res.data);
            if (res.status === 200) {
                router.push("/dashboard")
                localStorage.setItem ("token",res.data.token)
            }
            console.log(res);
        } catch (error:any) {
                console.log(error ,"moya mama");
                
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    ///////////////////////////////////////

    function logOut(){
        // logOut function realized in navbar
    }



  return {login,logOut,userinlogin,error,loading,Register};
}

export default useAuth