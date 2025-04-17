import { baseUrl } from '@/utils/url';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null); // this for setting the data data
  const [error, setError] = useState<string>(''); //this is for error from something
  const [loading, setLoading] = useState<boolean>(false); // this is for loading when data comming
  const [user, setUser] = useState<T | null>(null); // this for setting the user like data in dashboard
  // const [canrentabook , setCanRentaBook] use<boolean>(false)
  const [statusofuser,SetStatusOfUser] = useState<boolean>(false)
  const [can_rent_books,SetCanRentaBook] = useState<boolean>(false)
  const [location,SetLocation] = useState<boolean>(false)
  const [length,SetLength] = useState<number>(0)


  //////////////////////////////////////////////////////////////////////////// tihs for getting me in dashboard

  async function Geteverythink() {
    try {
      setError('');
      setLoading(true);
  
      const token = localStorage.getItem('token');

  
      const res = await axios.get(baseUrl + url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log(res.data, '🟢 USER DATA');
      setData(res.data);
      SetStatusOfUser(true);
      SetCanRentaBook(res.data.can_rent_books)
      SetLocation(res.data.address)
      SetLength(res.data.length)
    } catch (error: any) {
      console.error('🔴 ERROR:', error);
      setError(error.message);
      SetStatusOfUser(false);
    } finally {
      setLoading(false);
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  
  //////////////////////////////////////////////////////////////////////////// this is to using functions anywhere

  useEffect(() => {
    Geteverythink();
  }, [url]);


  //////////////////////////////////////////////////////////////////////////// there we export all functions and datas
  
  return { loading, error,  data, user,statusofuser,can_rent_books,SetStatusOfUser,location,length};
}

export default useFetch;
