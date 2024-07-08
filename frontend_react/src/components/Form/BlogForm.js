import React, {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {useAuth} from '../../context/AuthContext';

export const BlogForm = () => {
    const [cookies]  = useCookies(['token']);
    const {isLoggedIn} = useAuth

    useEffect(() => {
    }, [cookies, isLoggedIn]);

  return (
    <div>BlogForm</div>
  )
}
