import React,{useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';
import Card from './Blog/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cookies] = useCookies(['token']);
  const { isLoggedIn } = useAuth();
  const blogLists = [
    { id: '1',category:'React', title: 'Understanding React Hooks', author: 'Jane Doe', time: 'April 5, 2024', text: 'React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8...', comments: '12', ratings: '4.5' },
    { id: '2', category:'Tailwind', title: 'Getting Started with Tailwind CSS', author: 'John Smith', time: 'March 25, 2024', text: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is highly customizable and allows you to create...', comments: '8', ratings: '4.7' },
    { id: '3',category:'JavaScript', title: 'Mastering JavaScript', author: 'Alice Johnson', time: 'May 29, 2024', text: 'JavaScript is a versatile language used for both front-end and back-end development. This guide will help you master the basics and advanced concepts...', comments: '15', ratings: '4.9' },
  ];

  //useEffect(() => {
  //}, [cookies, isLoggedIn]);

  return (
    <div className="p-8">

      {
        blogLists.map((item,index)=>(
          <Link to={`/blog/${item.category}/${item.id}`} key={item.id}>
           <Card cardItem={item}  />
          </Link>
        ))
      }
    </div>
  );
}

export default Home