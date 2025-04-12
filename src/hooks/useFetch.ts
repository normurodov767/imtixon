import { baseUrl } from '@/utils/url';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Posts } from '../interface/PostsID';
import { useParams } from 'next/navigation';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null); // this for setting the data data
  const [Profiles, setProfiles] = useState<T | undefined>(undefined); // this for setting profiles like data developers
  const [error, setError] = useState<string>(''); //this is for error from something
  const [loading, setLoading] = useState<boolean>(false); // this is for loading when data comming
  const [user, setUser] = useState<T | null>(null); // this for setting the user like data in dashboard
  const [posts, setPosts] = useState<T | null>(null); // this for setting the posts like data in posts
  const [statusofLike, setStatusofLike] = useState<any>(); // this is for me just to see status of like because like is problem function
  const [statusofuser,SetStatusOfUser] = useState<boolean>(true)

  //////////////////////////////////////////////////////////////////////////// tihs for getting me in dashboard

  async function getMe() {
    try {
      setError('');
      setLoading(true);
      let res = await axios.get(baseUrl + url, {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setData(res.data);
      setProfiles(res.data);
      setPosts(res.data);
      setLoading(false);
      setUser(res.data);
      console.log(res.data)

      if (res.status === 400) {
      SetStatusOfUser(false)
      console.log();
      
      }

    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      console.log(error);
      SetStatusOfUser(false)
      
    } finally {
      setLoading(false);
    }
  }

  //////////////////////////////////////////////////////////////////////////// this is to using functions anywhere

  useEffect(() => {
    getMe();
    // GetProfiles();
  }, [url]);

  //////////////////////////////////////////////////////////////////////////// this is to getting profiles in developers

  async function GetProfiles() {
    try {
      setLoading(true);
      let res = await axios.get(baseUrl + url, {
        headers: {
          // there no token bcs (because) this is public :>
          'Content-Type': 'application/json',
        },
      });
      setProfiles(res.data);
      console.log(res);
    } catch (error: any) {
      setError(error.massage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  //////////////////////////////////////////////////////////////////////////// there we export all functions and datas
  return { loading, error, data, Profiles, user, posts,  statusofLike,statusofuser,SetStatusOfUser};
}

export default useFetch;
