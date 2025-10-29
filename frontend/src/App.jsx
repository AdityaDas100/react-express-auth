import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user,setUser] = useState(null);
  const [error,setError] = useState("");
  const [isloading,setIsLoading] = useState(true);

  useEffect(()=>{
  const fetchUser = async () =>{
    const token = localStorage.getItem("token");
    if(token){
      try {
        const res = await axios.get('/api/users/me',{
          headers:{Authorization:`Bearer ${token}`}
        })
        setUser(res.data)
      } catch (error) {
        setError("Failed to fetch data");
        localStorage.removeItem("token")       
      }
    }
    setIsLoading(false);
  }
  fetchUser();
  },[])

  if(isloading){
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justfiy-center'>
        <div className='text-xl text-white'>
         Loading... 
        </div>
      </div>
    )
  }


  return (
    <>
     <div>
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<Home user={user} error={error}/>} />
          <Route path='/login' element={user?<Navigate to='/'/>:<Login setUser={setUser}/>} />
          <Route path='/register' element={user?<Navigate to='/'/>:<Register setUser={setUser}/>} />
        </Routes>
      </Router>
     </div>
    </>
  )
}

export default App
