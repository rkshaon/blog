import React,{useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';
import Card from './Blog/Card';

const Home = () => {
  const [cookies] = useCookies(['token']);
  const { isLoggedIn } = useAuth();
  const blogList =[
    {
      image:"https://via.placeholder.com/400x200",
      title:"Exploring React Components",
      author:"Bob Martin",
      time:"2024-06-01T12:00:00Z",
      text:"React components are the building blocks of a React application. This article explores how to create and use them effectively...",
      comments:"5",
      ratings:"4.3",
      category:"React",
    },
    {
      image:"https://via.placeholder.com/400x200",
      title:"Exploring React Components",
      author:"Bob Martin",
      time:"2024-06-01T12:00:00Z",
      text:"React components are the building blocks of a React application. This article explores how to create and use them effectively...",
      comments:"5",
      ratings:"4.3",
      category:"React",
    },
    {
      image:"https://via.placeholder.com/400x200",
      title:"Exploring React Components",
      author:"Bob Martin",
      time:"2024-06-01T12:00:00Z",
      text:"React components are the building blocks of a React application. This article explores how to create and use them effectively...",
      comments:"5",
      ratings:"4.3",
      category:"React",
    },
    {
      image:"https://via.placeholder.com/400x200",
      title:"Exploring React Components",
      author:"Bob Martin",
      time:"2024-06-01T12:00:00Z",
      text:"React components are the building blocks of a React application. This article explores how to create and use them effectively...",
      comments:"5",
      ratings:"4.3",
      category:"React",
    },
  ]

  //useEffect(() => {
  //}, [cookies, isLoggedIn]);

  return (
    <div className="p-8">

      {
        blogList.map((item)=>(
          <Card cardItem={item} />
        ))
      }
    </div>
  );
}

export default Home