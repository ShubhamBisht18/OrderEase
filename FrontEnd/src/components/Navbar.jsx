// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from '../axios';

// function Navbar({ user, setUser }) {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const scrollToSection = (id) => {
//         const section = document.getElementById(id);
//         if (section) {
//             section.scrollIntoView({ behavior: 'smooth' });
//         } else if (location.pathname !== '/') {
//             navigate(`/#${id}`);
//         }
//     };

//     const handleLogout = async () => {
//         await axios.post('/auth/logout');
//         setUser(null);
//         navigate('/login');
//     };

//     return (
//         <div className='fixed top-0'>
//             <nav className='border-2 border-black h-[70px] w-[100%]'>
//                 <Link onClick={() => scrollToSection('home')}>Home</Link>
//                 <Link onClick={() => scrollToSection('menu')}>Menu</Link>
//                 <Link onClick={() => scrollToSection('about')}>About</Link>
//                 <Link onClick={() => scrollToSection('contact')}>Contact</Link>

//                 <Link to='/myorder'>MyOrders</Link>
//                 {user?.role === 'admin' && (
//                     <>
//                         <Link to='/addfood'>AddFood</Link>
//                         <Link to='/dashboard'>Dashboard</Link>
//                     </>
//                 )}
//                 <Link onClick={handleLogout}>Logout</Link>
//             </nav>
//         </div>

//     );
// }

// export default Navbar;

// Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../axios';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else if (location.pathname !== '/') {
            navigate(`/#${id}`);
        }
    };

    const handleLogout = async () => {
        await axios.post('/auth/logout');
        setUser(null);
        navigate('/login');
    };

    return (
        // Fixed bar spans full viewport width regardless of parent flex settings
        <nav className="fixed top-0 w-screen h-[65px] text-gray-200 font-medium flex items-center justify-center bg-orange-400">
            {/* Smooth‑scroll links */}
            <div className='flex justify-center gap-[30px] items-center w-[1000px] h-[65px] border-2 border-black'>
                <img src="src\assets\Logo.png" alt="Logo" className='w-[190px] mr-[30px]' />
                <Link onClick={() => scrollToSection('home')}>Home</Link>
                <Link onClick={() => scrollToSection('menu')}>Menu</Link>
                <Link onClick={() => scrollToSection('about')}>About</Link>
                <Link onClick={() => scrollToSection('contact')}>Contact</Link>

                {/* Route links */}
                <Link to="/myorder">My Orders</Link>
                {user?.role === 'admin' && (
                    <>
                        <Link to="/addfood">Add Food</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </>
                )}
                <button onClick={handleLogout} className="bg-gray-200 text-black font-bold rounded-[5px] h-[40px] w-[90px] ml-[30px]">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;