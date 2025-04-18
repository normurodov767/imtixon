"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User } from '@/interface/User';
import { baseUrl } from '@/utils/url';

function useAuth() {
  const [userinlogin, setUserinLogin] = useState<User | null>(null); // sets user info
  const [error, setError] = useState<string>(""); // sets error message
  const [loading, setLoading] = useState<boolean>(false); // loading indicator
  const router = useRouter();

  // Login Function
  const login = async (phone: string, password: string) => {
    try {
      setLoading(true);

      const res = await axios.post(`${baseUrl}auth/login/`, {
        phone,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.access);
        router.push("/dashboard");
      }

    } catch (error) {
      if (error instanceof Error) {
        alert('Account is not verified');
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Register Function
  const register = async (
    password: string,
    name: string,
    phone: string,
    address: string
  ) => {
    try {
      setLoading(true);

      const res = await axios.post(`${baseUrl}auth/register-library/`, {
        user: {
          password,
          phone,
          name
        },
        library: {
          address
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Log Out
  const logOut = () => {
    localStorage.removeItem("token");
    setUserinLogin(null);
    router.push("/");
  };

  return {
    login,
    register,
    logOut,
    userinlogin,
    error,
    loading
  };
}

export default useAuth;
