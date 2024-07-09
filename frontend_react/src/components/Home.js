import React,{useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';
import Card from './Blog/Card';
import { Link } from 'react-router-dom';
import {BlogForm} from './Form/BlogForm';

const Home = ({blogLists}) => {
  const [cookies] = useCookies(['token']);
  const { isLoggedIn } = useAuth();

  //useEffect(() => {
  //}, [cookies, isLoggedIn]);

  return (
    <>
      <BlogForm />
      <div className="p-8">

      {
        blogLists.map((item,index)=>(
          <Link to={`/blog/${item.category}/${item.id}`} key={item.id}>
           <Card cardItem={item}  />
          </Link>
        ))
      }
    </div>
    </>
    
  );
}

export default Home