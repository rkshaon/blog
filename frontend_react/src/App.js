import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NotFound from './components/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import {BlogForm} from './components/Form/BlogForm';


function App() {
  const blogLists = [
    { id: '1',category:'React', title: 'Understanding React Hooks', author: 'Jane Doe', time: 'April 5, 2024', text: 'React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8...', comments: '12', ratings: '4.5' },
    { id: '2', category:'Tailwind', title: 'Getting Started with Tailwind CSS', author: 'John Smith', time: 'March 25, 2024', text: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is highly customizable and allows you to create...', comments: '8', ratings: '4.7' },
    { id: '3',category:'JavaScript', title: 'Mastering JavaScript', author: 'Alice Johnson', time: 'May 29, 2024', text: 'JavaScript is a versatile language used for both front-end and back-end development. This guide will help you master the basics and advanced concepts...', comments: '15', ratings: '4.9' },
  ];

  return (
    <>
    <AuthProvider>
       <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home blogLists={blogLists} />} />
            <Route path="/blog/:id" element={<ProtectedRoute><Blog blogLists={blogLists} /></ProtectedRoute>} />
            <Route path='/createblog' element={<ProtectedRoute><BlogForm /> </ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
