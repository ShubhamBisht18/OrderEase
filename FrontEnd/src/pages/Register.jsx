
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios';

function Register({ setUser }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/auth/register', data);
      setUser(res.data.user);
      alert('Register Successfully!!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration Failed!');
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center flex-col relative'>
      <div className='w-full h-[45%] bg-orange-400'></div>
      <div className='w-full h-[65%] bg-white'></div>
      <div className='w-4/5 h-3/5 absolute flex justify-center lg:justify-between items-center'>
        {/* Welcome panel: hidden below 1024px, visible at 1024px and above */}
        <div className='w-[55%] h-[97%] hidden lg:block'>
          <img src='src/assets/Logo.png' alt='Logo' />
          <br />
          <h1 className='text-4xl font-extrabold text-gray-900'>Welcome to OrderEase</h1>
          <p className='mt-2 text-[18px] font-medium text-gray-500 w-11/12'>
            Join OrderEase and start placing your favorite meals in seconds.
          </p>
        </div>

        {/* Register form */}
        <form
          className='rounded-[6px] lg:border-2 border-orange-400 w-[390px] h-[450px] lg:h-[520px] flex justify-center items-center bg-white'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className='mb-5'>
              <h2 className='text-2xl font-bold'>Register</h2>
              <p className='font-semibold'>Create your account ✨</p>
            </div>
            <div className='mb-2'>
              <label htmlFor='name' className='block'>Name:</label>
              <input className='border w-[250px]' id='name' {...register('name', { required: true })} />
            </div>
            <div className='mb-2'>
              <label htmlFor='email' className='block'>Email:</label>
              <input className='border w-[250px]' id='email' {...register('email', { required: true })} />
            </div>
            <div className='mb-2'>
              <label htmlFor='mobile' className='block'>Mobile:</label>
              <input className='border w-[250px]' id='mobile' {...register('mobile', { required: true })} />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block'>Password:</label>
              <input className='border w-[250px]' type='password' id='password' {...register('password', { required: true })} />
            </div>
            <button type='submit' className='w-[250px] h-[35px] rounded-[5px] bg-orange-500 text-white font-semibold border-2 mt-[8px]'>
              Register
            </button>
            <p className='text-center text-black mt-2'>
              Already have an account?{' '}
              <Link to='/login' className='text-orange-500 font-medium'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

