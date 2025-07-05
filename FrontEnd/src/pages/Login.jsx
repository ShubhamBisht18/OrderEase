import { useForm } from 'react-hook-form'
import axios from '../axios'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setUser }) {

    const {
        register,
        handleSubmit
    } = useForm()
    const navigate = useNavigate()


    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/auth/login', data)
            setUser(res.data.user)
            alert("Login Successfully!!")
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    }

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-center flex-col relative'>
            <div className='w-[100%] h-[50%] bg-orange-400'></div>
            <div className='w-[100%] h-[75%] bg-white'></div>
            <div className='w-[80%] h-[60%] absolute flex justify-center lg:justify-between items-center'>
                <div className='w-[55%] h-[97%] hidden lg:block'>
                    <img src="src\assets\Logo.png" alt="Logo" />
                    <br />
                    <h1 className="text-4xl font-extrabold text-gray-900">Welcome to OrderEase</h1>
                    <p className="mt-2 text-[18px] font-medium text-gray-500 w-[90%]">
                        We're glad to have you here! <br /> Login to OrderEase and enjoy a seamless food ordering experience.
                    </p>
                </div>
                <form className='rounded-[6px] lg:border-2 border-orange-400 w-[390px] h-[450px] flex justify-center items-center bg-white' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='mb-5'>
                            <h2 className='text-2xl font-bold'>Login</h2>
                            <p className='font-semibold'>Hi, Welcome back 👋</p>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="email">Email:</label>
                            </div>
                            <input className='border-1 w-[250px] ' name='email' id='email' {...register('email', {
                                required: true
                            })} />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="password">Password</label>
                            </div>
                            <input className='border-1 w-[250px] ' name='password' id='password' type="text" {...register('password', {
                                required: true
                            })} />
                        </div>
                        <div className='w-[250px] h-[50px] flex justify-center items-center mt-[20px]'>
                            <button className='text-center border-2 w-[250px] h-[35px] rounded-[5px] bg-orange-500 text-white font-semibold' type="submit">Login</button>
                        </div>
                        <p className='text-center text-black'>Don't have an account? <Link className='text-orange-500 font-medium' to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login