import React,{useEffect} from 'react'
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookies] = useCookies(['token']);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log('Token in cookies on home page:', cookies.token);
    console.log('isLoggedIn state on home page:', isLoggedIn);
  }, [cookies, isLoggedIn]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home