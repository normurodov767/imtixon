'use client';
import useFetch from '@/hooks/useFetch';
import { User } from '@/interface/User';
import { useRouter } from 'next/navigation';
import React from 'react';

function Dashboard() {
  const { data, loading, error, statusofuser } = useFetch<User | null>('libraries/libraries');
  const router = useRouter();

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-rose-50 p-6">
      {/* Верхняя карточка с общими данными */}
      <div className="bg-white border border-rose-100 shadow-xl p-8 rounded-3xl w-full max-w-md text-center mb-10 transition-all duration-300">
        <h1 className="text-3xl font-bold text-rose-400 mb-3">📚 Libraries</h1>
        <p className="text-rose-500 text-lg">Welcome To Our Cozy Library Space</p>
        <p className="text-rose-400 mt-2">Books available: {Array.isArray(data) ? data.length : 0}</p>
      </div>

      {/* Mап по библиотекам */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {Array.isArray(data) &&
          data.map((library: any) => (
            <div
              key={library.id}
              className="bg-white border border-rose-100 p-6 rounded-3xl shadow-md hover:shadow-xl hover:bg-rose-50 transition-all duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-rose-500 mb-2">{library.name}</h2>
              <p className="text-rose-400">📍 {library.address}</p>
              <p className="text-rose-400">📚 Books: {library.total_books}</p>
              <button
                onClick={() => router.push(`/library/${library.id}`)}
                className="mt-4 px-5 py-2.5 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-all duration-300 shadow hover:shadow-md"
              >
                About Library
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
