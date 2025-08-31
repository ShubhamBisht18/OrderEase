// // App.jsx
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from './axios';
// import Layout from './Layout';

// // Pages (routing)
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AddFood from './pages/AddFood';
// import Dashboard from './pages/Dashboard';
// import MyOrders from './pages/MyOrders';
// import AdminOnly from './pages/AdminOnly';
// import Landing from './pages/Landing';
// import Menu from './components/Menu';
// import Cart from './pages/Cart';


// function App() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get('/auth/me')
//       .then(res => setUser(res.data.user))
//       .catch(() => {
//         setUser(null);
//         navigate('/login');
//       });
//   }, []);

//   if (!user) {
//     return (
//       <Routes>
//         <Route path='/register' element={<Register setUser={setUser} />} />
//         <Route path='/login' element={<Login setUser={setUser} />} />
//       </Routes>
//     );
//   }

//   return (
//     <Routes>
//       <Route path='/' element={<Layout user={user} setUser={setUser} />}>
//         {/* Landing page with scroll sections */}
//         <Route index element={<Landing />} />

//         {/* Pages */}
//         <Route path='menu' element={<Menu />} />
//         <Route path='myorder' element={<MyOrders />} />
//         <Route path='cart' element={<Cart />} />
//         <Route path='addfood' element={user?.role === 'admin' ? <AddFood /> : <AdminOnly />} />
//         <Route path='dashboard' element={user?.role === 'admin' ? <Dashboard /> : <AdminOnly />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

// App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './axios';
import Layout from './Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import AddFood from './pages/AddFood';
import Dashboard from './pages/Dashboard';
import MyOrders from './pages/MyOrders';
import AdminOnly from './pages/AdminOnly';
import Landing from './pages/Landing';
import Menu from './components/Menu';
import Cart from './pages/Cart';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on page load
  useEffect(() => {
    axios.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Optional: redirect logged-in users away from /login or /register
  useEffect(() => {
    if (!loading && user && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
      navigate('/');
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {!user ? (
        // Public routes
        <>
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path='/' element={<Login setUser={setUser} />} /> {/* fallback */}
          <Route path='*' element={<Login setUser={setUser} />} /> {/* unknown routes */}
        </>
      ) : (
        // Protected routes
        <Route path='/' element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Landing />} />
          <Route path='menu' element={<Menu />} />
          <Route path='myorder' element={<MyOrders />} />
          <Route path='cart' element={<Cart />} />
          <Route path='addfood' element={user.role === 'admin' ? <AddFood /> : <AdminOnly />} />
          <Route path='dashboard' element={user.role === 'admin' ? <Dashboard /> : <AdminOnly />} />
          <Route path='*' element={<Landing />} /> {/* fallback for unknown routes */}
        </Route>
      )}
    </Routes>
  );
}

export default App;
