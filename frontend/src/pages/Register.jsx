import  { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = ({setUser}) => {
   
    const[error,setError] = useState('');
    const navigate = useNavigate();
    const[formData,setFormdata]=useState({
        username:"",
        email:"",
        password:"",
    });

  const handleChange = (e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/register",formData);
            localStorage.setItem("token",res.data.token);
            console.log(res.data);
            setUser(res.data);
            navigate('/');
        } catch (error) { 
            setError(error.response?.data?.message||"Register failed");
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200'>
        <h2 className='text-2xl font-bold mb-6 text-center text-grey-800'>Register</h2>
        {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
                <label className='block text-grey-600 text-sm font-medium mb-1'>Username</label>
                <input className='w-full p-3 border border-grey-300 rounded-md focus:ring-2 focus:ring-blue-200
                outline-none focus:border-blue-400' 
                type="username"
                autoComplete='off' 
                name='username'
                value={formData.username} 
                onChange={handleChange} 
                placeholder='Enter your username' required/>
            </div>
            <div>
                <label className='block text-grey-600 text-sm font-medium mb-1'>Email</label>
                <input className='w-full p-3 border border-grey-300 rounded-md focus:ring-2 focus:ring-blue-200
                outline-none focus:border-blue-400' 
                type="email"
                autoComplete='off' 
                name='email'
                value={formData.email} 
                onChange={handleChange} 
                placeholder='Enter your email' required/>
            </div>
            <div className='mb-6'>
                <label className='block text-grey-600 text-sm font-medium mb-1'>Password</label>
                <input className='w-full p-3 border border-grey-300 rounded-md focus:ring-2 focus:ring-blue-200
                outline-none focus:border-blue-400' 
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange} 
                placeholder='Enter your password' required/>
            </div>
            <button className='w-full bg-blue-500 text-white  p-3 rounded-md hover:bg-blue-600 font-medium cursor-pointer'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register;