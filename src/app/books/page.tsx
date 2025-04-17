'use client';
import useFetch from '@/hooks/useFetch';
import useFunction from '@/hooks/useFunction';
import { Book } from '@/interface/books';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function BooksDashboard() {
  const { data, loading, error } = useFetch<Book[] | null>('books/books');
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { DeleteBook } = useFunction<Book | null>("books/book/");
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const { PostBook } = useFunction<Book | null>(`books/books/`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    PostBook(name, author, publisher);
  };

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-rose-50 p-6">
      {/* Верхняя карточка */}
      <div className="bg-white border border-rose-100 shadow-xl p-8 rounded-3xl w-full max-w-md text-center mb-8 transition-all duration-300">
        <h1 className="text-3xl font-bold text-rose-500 mb-2">📚 Books</h1>
        <p className="text-rose-700 text-lg">Welcome to our cozy book corner</p>
        <p className="text-rose-600 mt-1 mb-4">Total books: {Array.isArray(data) ? data.length : 0}</p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-5 py-2.5 bg-amber-300 text-rose-800 rounded-xl hover:bg-amber-400 transition-all duration-300 shadow hover:shadow-md"
        >
          Want Post a New Book?
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-start gap-4 text-left">
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
              className="self-center px-6 py-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all duration-300 shadow hover:shadow-lg"
            >
              Submit
            </button>
          </form>
        )}
      </div>

      {/* Список книг */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {Array.isArray(data) &&
          data.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-rose-100 p-5 rounded-2xl shadow-md hover:shadow-xl hover:bg-rose-100 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-rose-600 mb-1">{book.name}</h2>
              <p className="text-rose-500">✍️ Author: {book.author}</p>
              <p className="text-rose-500">🏢 Publisher: {book.publisher}</p>
              <p className="text-rose-500">📦 In Library: {book.quantity_in_library}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push(`/book/${book.id}`)}
                  className="px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition-all shadow"
                >
                  Read More
                </button>
                <button
                  onClick={() => DeleteBook(book.id)}
                  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-all shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BooksDashboard;
