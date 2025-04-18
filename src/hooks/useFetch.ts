import { baseUrl } from '@/utils/url';
import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [statusOfUser, setStatusOfUser] = useState<boolean>(false);
  const [canRentBooks, setCanRentBooks] = useState<boolean>(false);
  const [location, setLocation] = useState<boolean>(false); // address presence flag
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    const getEverything = async () => {
      try {
        setError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const res = await axios.get(baseUrl + url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(res.data, '🟢 USER DATA');

        setData(res.data);
        setStatusOfUser(true);
        setCanRentBooks(res.data.can_rent_books);
        setLocation(!!res.data.address);
        setLength(res.data.length || 0);
      } catch (error) {
        console.error('🔴 ERROR:', error);
        if (error instanceof Error) {
          setError(error.message);
        }
        setStatusOfUser(false);
      } finally {
        setLoading(false);
      }
    };

    getEverything();
  }, [url]);

  return {
    loading,
    error,
    data,
    statusOfUser,
    canRentBooks,
    location,
    length,
    setStatusOfUser,
  };
}

export default useFetch;

