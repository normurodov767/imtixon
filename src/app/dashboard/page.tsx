'use client';
import useFetch from '@/hooks/useFetch';
import { User } from '@/interface/User';
import { useRouter } from 'next/navigation';
import React from 'react';

function Dashboard() {
  const { data, loading, error, statusofuser, can_rent_books, location } = useFetch<User>('auth/profile/');
  let router = useRouter();
  
  if (!localStorage.getItem('token')) {
    router.push('/login');
  }
  console.log(data);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-rose-50 p-6">
      <div className="bg-white shadow-xl p-6 rounded-3xl w-96 text-center transition-all duration-300">
        <h1 className="text-3xl font-bold text-rose-500 mb-4">📚 Dashboard</h1>
        <h2 className="text-lg font-semibold text-rose-700 mb-2">Welcome To Our Cozy Library</h2>

        <div className="text-rose-600">
          <p>🏠 Your Location: {statusofuser ? location : "..."}</p>
          <p>📖 Can Rent a Book: {statusofuser ? (can_rent_books ? "Yes" : "No") : "..."}</p>
        </div>

        <div className="mt-6 space-y-4">
          <button
            className="w-full px-6 py-2 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-all duration-300 shadow-lg"
            onClick={() => router.push('/libraries')}
          >
            Go to Libraries
          </button>

          <button
            className="w-full px-6 py-2 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-all duration-300 shadow-lg"
            onClick={() => router.push('/books')}
          >
            Go to Books
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
