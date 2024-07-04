import React from 'react';
import { useParams } from 'react-router-dom';

const Blog = ({blogLists}) => {
  const {category,id} = useParams();

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