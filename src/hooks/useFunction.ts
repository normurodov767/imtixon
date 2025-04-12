import { baseUrl } from '@/utils/url';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Posts } from '../interface/PostsID';
import { useParams } from 'next/navigation';
import useFetch from './useFetch';
import { User } from '@/interface/User';

function useFunction<T>(url: string) {
  const [error, setError] = useState<string>(''); //this is for error from something
  const [loading, setLoading] = useState<boolean>(false); // this is for loading when data comming
  const [statusofLike, setStatusofLike] = useState<any>(); // this is for me just to see status of like because like is problem function
  const [statusofuser,SetStatusOfUser] = useState<boolean>(true)

//////////////////////////////////////////////////////////////////////////// this is problem function like in posts

  async function Like() {
    try {
      setError('');
      setLoading(true);
      let res = await axios.put(baseUrl + url,undefined, {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.status);
      console.log(res);
      setStatusofLike(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  //////////////////////////////////////////////////////////////////////////// this is problem function unlike in posts

  async function UnLike() {
    try {
      setError('');
      setLoading(true);
      let res = await axios.put(baseUrl + url,undefined, {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.status);
      console.log(res);
      setStatusofLike(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  //////////////////////////////////////////////////////////////////////////// this is problem function unlike in posts
  
  async function PostComment(text: string){
    try {
      setError('');
      setLoading(true);
      let res = await axios.post(baseUrl + url,
        {
          text
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
  //////////////////////////////////////////////////////////////////////////// there we export all functions and datas
  async function DeleteMyPost(post_id:string){
  console.log(post_id,"lllllllllllllllllllllllllllllllllllllllllll");
  
    try {
      setError('');
      setLoading(true);
      let res = await axios.delete(baseUrl + url + post_id , {
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
  ////////////////////////////////////////////////////////////////////////////
  async function DeleteMyAccount(){
      try {
        setError('');
        setLoading(true);
        let res = await axios.delete(baseUrl + url , {
          headers: {
            'x-auth-token': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(res.status,"12111111111111111111111111111111111111111111111");
        console.log(res, "aaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        if (res.status === 200) {
          localStorage.removeItem('token');
          SetStatusOfUser(false);
        }
      } catch (error: any) {
        setError(error.message);
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    }
  //////////////////////////////////////////////////////////////////////////// there we export all functions and datas
  return { loading, error, Like, statusofLike,UnLike,PostComment,statusofuser,DeleteMyPost,DeleteMyAccount};
}

export default useFunction;
