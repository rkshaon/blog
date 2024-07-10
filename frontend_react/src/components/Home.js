import React,{useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';
import Card from './Blog/Card';
import { Link } from 'react-router-dom';
import {BlogForm} from './Form/BlogForm';
import API_BASE_URL from '../config/environment';

const Home = () => {
  const [cookies] = useCookies(['token']);
  const { isLoggedIn } = useAuth();
  const [blogList, setBlog] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect(() => {
  //}, [cookies, isLoggedIn]);

  useEffect(()=>{
    const fetchBlog = async ()=>{
      try {
        const url = `${API_BASE_URL}/api/v1/blog/?status=approved`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/join',
            Authorization: `Bearer ${cookies.token}`,
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blog!");
        }
        const data = await response.json();
        console.log('blog response data', data);
        setBlog(data);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchBlog();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }


  return (
    <>
      {/*<BlogForm />*/}
     
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogList.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id}>
            <Card cardItem={post}/>
          </Link>
        ))}
      </div>
    </div>
    </>
    
  );
}

export default Home