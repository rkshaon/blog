import React from 'react';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const {category,id} = useParams();

  const blogLists = [
    { id: '1',category:'React', title: 'Understanding React Hooks', author: 'Jane Doe', time: 'April 5, 2024', text: 'React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8...', comments: '12', ratings: '4.5' },
    { id: '2', category:'Tailwind', title: 'Getting Started with Tailwind CSS', author: 'John Smith', time: 'March 25, 2024', text: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is highly customizable and allows you to create...', comments: '8', ratings: '4.7' },
    { id: '3',category:'JavaScript', title: 'Mastering JavaScript', author: 'Alice Johnson', time: 'May 29, 2024', text: 'JavaScript is a versatile language used for both front-end and back-end development. This guide will help you master the basics and advanced concepts...', comments: '15', ratings: '4.9' },
  ];
  const blogPost = blogLists.find((item)=>item.id === id);

  if (!blogPost) {
    return (
      <div className="container mx-auto p-4">Blog post not found</div>
    )
  }
  return (
    <>
       <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{blogPost.title}</h1>
          <p className="text-gray-700 mb-4">By {blogPost.author}</p>
          <div className="text-gray-800">
            {blogPost.text}
          </div>
        </div>
    </>
  )
}

export default Blog