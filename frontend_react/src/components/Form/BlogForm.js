import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import {useAuth} from '../../context/AuthContext';
import API_BASE_URL from '../../config/environment';

export const BlogForm = () => {
    const [cookies]  = useCookies(['token']);
    const {isLoggedIn} = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
    }, [cookies, isLoggedIn]);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const blogInfo = {
                title: formData.title,
                content: formData.content
            }
            const url = `${API_BASE_URL}/api/v1/blog/`;
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.token}`,
                },
                body: JSON.stringify(blogInfo)
            })
            //console.log('response', response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Failed to create Blog');
              }
        
              const data = await response.json();
            //  console.log('blog create successful', data);
        } catch (error) {
            console.log('blog submit error: ', error);
        }
    }

  return (
    <>
        <div className="min-h-screen flex items-center justify-center">
            <div className=" p-8 border rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl  font-bold mb-6 text-center">Blog</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-4">
                <label htmlFor="username" className="block ">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder='title'
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2  border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block ">Content</label>
                <textarea
                    type="text"
                    id="content"
                    name="content"
                    placeholder='content'
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
                </div>
            
                <button
                type="submit"
                className="w-full py-2 bg-royalblue text-white font-bold bg-emerald-500 rounded hover:bg-blue-600 transition duration-300"
                >
                Save
                </button>
            </form>
            </div>
        </div>
    </>
  )
}
