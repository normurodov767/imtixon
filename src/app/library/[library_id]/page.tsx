'use client';
import useFetch from '@/hooks/useFetch';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

// Импорти интерфейсы (предполагается, что они у тебя в '@/interface/LibraryDetail.ts')
import { LibraryDetailResponse } from '@/interface/User';

function LibraryDetail() {
  const { library_id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useFetch<LibraryDetailResponse>(`libraries/library/${library_id}`);

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  const books = data?.results.books;
  const library = data?.results.library;
  
  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading data.</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-rose-50 p-6">
      {/* Блок с информацией о библиотеке */}
      {library && (
        <div className="bg-white shadow-xl p-6 rounded-3xl w-full max-w-md text-center mb-10">
          <h1 className="text-3xl font-bold text-rose-500 mb-4">Library Info</h1>
          <p className="text-rose-600 text-lg mb-2">Welcome To Our Cozy Library</p>
          <p className="text-rose-700 mb-1">📚 Total books: {library.total_books}</p>
          <p className="text-rose-700 mb-1">📍 Address: {library.address}</p>
          <p className="text-rose-700 mb-1">
            📖 Can rent books:{' '}
            <span className={library.can_rent_books ? 'text-green-600' : 'text-red-600'}>
              {library.can_rent_books ? 'Yes' : 'No'}
            </span>
          </p>
          {library.google_maps_url && (
            <a
              href={library.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View on Google Maps
            </a>
          )}
          {library.phone && (
            <p className="text-rose-700 mt-2 text-sm">📞 {library.phone}</p>
          )}
          {library.social_media?.telegram && (
            <p className="text-rose-700 text-sm">💬 Telegram: {library.social_media.telegram}</p>
          )}
        </div>
      )}

      {/* Список книг */}
      <div className="w-full max-w-6xl">
        <h2 className="text-xl font-semibold text-rose-800 mb-4">Books in Library</h2>
        {Array.isArray(books) && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book:any) => (
              <div
                key={book.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-rose-700 mb-1">{book.name}</h3>
                <p className="text-rose-600">✍️ Author: {book.author}</p>
                <p className="text-rose-600">🏢 Publisher: {book.publisher}</p>
                <p className="text-rose-600">📦 In Library: {book.quantity_in_library}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-rose-600 text-center">No books found in this library.</p>
        )}
      </div>
    </div>
  );
}

export default LibraryDetail;
