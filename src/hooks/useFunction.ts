import { baseUrl } from '@/utils/url';
import axios from 'axios';
import React, { useState  } from 'react';


function useFunction<T>(url:string) {
    
    const [error, setError] = useState<string>(''); //this is for error from something
    const [loading, setLoading] = useState<boolean>(false); // this is for loading when data comming
     
  async function PostBook(name: string,author:string,publisher:string){
    try {
      setError('');
      setLoading(true);
      let res = await axios.post(baseUrl + url,
        {
          name,
          author,
          publisher
        }
        , {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.status);
      console.log(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function DeleteBook(book_id:string){
    
      try {
        setError('');
        setLoading(true);
        let res = await axios.delete(baseUrl + url + book_id + "/", {
          headers: {
            'x-auth-token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(res.status);
        console.log(res, "sdfghjhgfdfghjhgfdsdfghjk ");
      } catch (error: any) {
        setError(error.message);
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    }
  return { error, loading, PostBook, DeleteBook}
}

export default useFunction