'use client';
import useFetch from '@/hooks/useFetch';
import useFunction from '@/hooks/useFunction';
import { Book } from '@/interface/User';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

function BookDetail() {
  const { book_id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useFetch<Book | null>(`books/book/${book_id}`);
  const [want, setWant] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const { PostBook } = useFunction<Book | null>(`books/book/${book_id}`);

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  if (loading) return <p className="text-center mt-10 text-rose-400">Loading...</p>;
  if (error || !data) return <p className="text-center mt-10 text-red-400">Book not found.</p>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    PostBook(name, author, publisher);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-rose-50 p-6">
      <div className="bg-white border border-rose-100 shadow-xl p-8 rounded-3xl w-full max-w-md text-center transition-all duration-300">
        <h1 className="text-2xl font-bold text-rose-500 mb-3">{data.name}</h1>
        <p className="text-rose-400 text-lg mb-1">✍️ Author: {data.author}</p>
        <p className="text-rose-400 mb-1">🏢 Publisher: {data.publisher}</p>
        <p className="text-rose-400 mb-1">📦 Quantity In Library: {data.quantity_in_library}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition-all duration-300 shadow hover:shadow-md"
          >
            Go Back
          </button>

          <button
            onClick={() => setWant(!want)}
            className="px-5 py-2.5 bg-amber-300 text-rose-800 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow hover:shadow-md"
          >
            Want some changes?
          </button>
        </div>

        {want && (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col items-start gap-4 text-left">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-rose-200 rounded-xl placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              className="w-full p-3 border border-rose-200 rounded-xl placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Publisher"
              className="w-full p-3 border border-rose-200 rounded-xl placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />

            <button
              type="submit"
              className="self-center mt-2 px-6 py-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all duration-300 shadow hover:shadow-lg"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
