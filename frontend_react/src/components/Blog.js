import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../config/environment';
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';


const Blog = () => {
  const [cookies] = useCookies(['token']);
  const {category,id} = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchBlog = async ()=>{
      try {
        const url = `${API_BASE_URL}/api/v1/blog/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/join',
            Authorization: `Bearer ${cookies.token}`,
          }
        });
        if (!response.ok) {
          let res = await response.json();
          throw new Error(res.error);
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
  },[])
 

 
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
       <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-700 mb-4">By {blog.author.username}</p>
          <div className="text-gray-800">
            {blog.content}
          </div>
        </div>
    </>
  )
}

export default Blog