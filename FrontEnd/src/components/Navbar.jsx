// Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../axios';
import { useState } from 'react';
import logo from '../assets/Logo.png'

function Navbar({ user, setUser }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (location.pathname === '/') {
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                // hash changes but element not yet mounted
                window.location.hash = id;
            }
        } else {
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
        <nav className="sticky z-30 top-0 w-screen h-[65px] text-gray-200 font-medium flex items-center justify-center bg-white">
            {/* Smooth‑scroll links */}
            <div className=' lg:flex justify-center gap-[20px] items-center w-[90%] h-[65px] hidden text-black'>
                <img src={logo} alt="Logo" className='w-[190px] mr-[15px]' />
                {/* <img src="src\assets\Logo.png" alt="Logo" className='w-[190px] mr-[15px]' /> */}
                <Link to="/" onClick={() => scrollToSection('home')}>Home</Link>
                <Link to="/" onClick={() => scrollToSection('about')}>About</Link>
                <Link to="/" onClick={() => scrollToSection('contact')}>Contact</Link>

                {/* Route links */}
                <Link to="/menu">Menu</Link>
                <Link to="/myorder">MyOrders</Link>
                {user?.role === 'admin' && (
                    <>
                        <Link to="/addfood">AddFood</Link>
                        <Link to="/dashboard">Dashboard</Link>
                    </>
                )}
                <button onClick={handleLogout} className="bg-orange-400 text-gray-100 font-bold rounded-[5px] h-[40px] w-[90px] ml-[30px]">Logout</button>
            </div>

            {/* Mobile Nav */}
            <div className="flex justify-between w-[85%] items-center h-[65px] lg:hidden">
                {/* <img src="src/assets/Logo.png" alt="Logo" className="w-[150px]" /> */}
                <img src={logo} alt="Logo" className="w-[150px]" />

                {/* Menu Icon */}
                <button onClick={handleLogout} className="bg-orange-400 text-gray-100 font-bold rounded-[5px] h-[40px] w-[90px] ml-[15px]">Logout</button>
            </div>

            {/* Mobile Sidebar (only 4 links) */}
            {open && (
                <div className="absolute top-[65px] right-0 bg-black/30 text-white w-60 p-4 z-50 lg:hidden">
                    <button onClick={() => setOpen(false)} className="text-white text-xl mb-4">✕</button>
                    <ul className="flex flex-col gap-4 text-white">
                        <li>
                            <button onClick={handleLogout} className="text-left w-full">Logout</button>
                        </li>
                    </ul>
                </div>
            )}

            <div className="fixed right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 ml-2 lg:hidden">
                <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                    <button onClick={() => scrollToSection('home')}><img className='w-[25px] h-[25px]' src="src/assets/home.png" alt="Home" /></button>
                </div>
                <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                    <Link to="/menu"><img className='w-[25px] h-[25px]' src="src/assets/menu.png" alt="Menu" /></Link>
                </div>
                <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                    <button onClick={() => scrollToSection('about')}><img className='w-[25px] h-[25px]' src="src/assets/aboutus.png" alt="About" /></button>
                </div>
                <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                    <button onClick={() => scrollToSection('contact')}><img className='w-[25px] h-[25px]' src="src/assets/call.png" alt="Contact" /></button>
                </div>
                <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                    <Link to="/myorder"><img className='w-[25px] h-[30px]' src="src/assets/myorder.png" alt="MyOrder" /></Link>
                </div>
                {user?.role === 'admin' && (
                    <>
                        <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                            <Link to="/addfood"><img className='w-[25px] h-[25px]' src="src/assets/addfood.png" alt="AddFood" /></Link>
                        </div>
                        <div className="border-2 border-white rounded-[7px] w-[40px] h-[40px] bg-orange-400 flex justify-center items-center">
                            <Link to="/dashboard"><img className='w-[25px] h-[25px]' src="src/assets/dashboard.png" alt="Dashboard" /></Link>
                        </div>
                    </>
                )}
            </div>

        </nav>
    );
}



export default Navbar;

