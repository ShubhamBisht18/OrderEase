// App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './axios';
import Layout from './Layout';

// Pages (routing)
import Login from './pages/Login';
import Register from './pages/Register';
import AddFood from './pages/AddFood';
import Dashboard from './pages/Dashboard';
import MyOrders from './pages/MyOrders';
import AdminOnly from './pages/AdminOnly';
import Landing from './pages/Landing';
import Menu from './components/Menu';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => {
        setUser(null);
        navigate('/login');
      });
  }, []);

  if (!user) {
    return (
      <Routes>
        <Route path='/register' element={<Register setUser={setUser} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Layout user={user} setUser={setUser} />}>
        {/* Landing page with scroll sections */}
        <Route index element={<Landing />} />

        {/* Pages */}
        <Route path='menu' element={<Menu />} />
        <Route path='myorder' element={<MyOrders />} />
        <Route path='addfood' element={user?.role === 'admin' ? <AddFood /> : <AdminOnly />} />
        <Route path='dashboard' element={user?.role === 'admin' ? <Dashboard /> : <AdminOnly />} />
      </Route>
    </Routes>
  );
}

export default App;