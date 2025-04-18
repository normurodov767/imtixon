import { baseUrl } from '@/utils/url';
import axios from 'axios';
import { useState } from 'react';

function useFunction<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Добавление книги
  const postBook = async (name: string, author: string, publisher: string) => {
    try {
      setError('');
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const res = await axios.post(
        `${baseUrl}${url}`,
        { name, author, publisher },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );

      setData(res.data);
      console.log(res.status, res.data);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Удаление книги
  const deleteBook = async (bookId: string) => {
    try {
      setError('');
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      const res = await axios.delete(
        `${baseUrl}${url}${bookId}/`,
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(res.status, res.data);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    postBook,
    deleteBook,
  };
}

export default useFunction;
