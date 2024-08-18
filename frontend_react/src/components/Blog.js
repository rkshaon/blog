import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../config/environment';
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';
import { formatDistanceToNow } from 'date-fns';
import Rating from './Blog/Rating';


const Blog = () => {
  const [cookies] = useCookies(['token']);
  const {category,id} = useParams();
  const [blog, setBlog] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(()=>{
    const fetchBlog = async ()=>{
      try {
        const url = `${API_BASE_URL}/api/v1/blog/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.accessToken}`,
          }
        });
        if (!response.ok) {
          let res = await response.json();
          throw new Error(res.error || res.code);
        }
        const data = await response.json();
        //console.log('blog response data', data);
        setBlog(data);
        setComments(data.comments || []);
        setRating(data.rating || 0);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchBlog();
  },[id])

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    try {
      const commentInfo = {
        comment: newComment,
        blog: id
      }
      const url =`${API_BASE_URL}/api/v1/comment/`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.accessToken}`,
          },
          body: JSON.stringify(commentInfo)
        });
        if (!response.ok) {
          let res = await response.json();
          throw new Error(res.error);
        }
        const data = await response.json();
        //console.log('comment response data', data);
        setComments([...comments, data]);
        setNewComment('');
    } catch (error) {
      setError('An error occurred while adding the comment');
    }
  };

  const handleAddRating = async () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    try {
      const ratingInfo = {
        rating: rating,
        blog: id
      }
      const url = `${API_BASE_URL}/api/v1/rating/`
      const response = await fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        body: JSON.stringify(ratingInfo),
      })

      if (!response.ok) {
        let res = await response.json();
        throw new Error(res.error);
      }
      const data = await response.json();
      //console.log('comment response data', data);
      //setRating(0);
    } catch (error) {
      setError('An error occurred while adding the rating');
    }
  };
 

 
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const formattedTime = blog && formatDistanceToNow(new Date(blog.added_date_time), { addSuffix: true, includeSeconds: true });

  return (
    <>
      {blog && 
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-6 p-6">
      <div className="px-4 py-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          By <span className="font-semibold">{blog && blog.author.username}</span> - {formattedTime}
        </p>
        <div className="text-gray-700 text-lg leading-relaxed">
          {blog.content}
        </div>
      </div>
    
      {comments && (
        <div className="px-4 py-2 mt-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-4">Comments:</h3>
          {comments.length > 0 && comments.map((commentObj, index) => (
            <div key={commentObj.id} className="mb-4">
              <p className="text-gray-800 text-sm mb-2">{commentObj.comment}</p>
              <div className="text-gray-600 text-xs">
                <p>Commented by: <span className="font-semibold">{commentObj.commentor.username}</span></p>
                <p>Commented on: {formatDistanceToNow(new Date(commentObj.added_date_time), { addSuffix: true, includeSeconds: true })}</p>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Add a Comment:</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="Write your comment here..."
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>
        
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Rate this Blog:</h3>
            <Rating rating={rating} onRating={handleAddRating} />
          </div>

        </div>
      )}
    </div>
      }
    </>
  )
}

export default Blog