import { useForm } from 'react-hook-form';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function AddFood() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post('/food/add', data);
      alert('Food added!');
      navigate('/menu');
    } catch (err) {
      alert('Error adding food');
    }
  };

  return (
    <div className='h-[100%] w-[100%] relative'>
      <div className='h-[35%] bg-orange-400'></div>
      <div className='h-[65%] bg-white'></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
             h-[400px] w-[300px] flex justify-center items-center flex-col gap-4 bg-white rounded-lg shadow-lg"
      >
        <input placeholder='Name' {...register('name')} required className="border p-2 w-[90%] rounded" />
        <input placeholder='Image URL' {...register('image')} required className="border p-2 w-[90%] rounded" />
        <input type='number' placeholder='Price' {...register('price')} required className="border p-2 w-[90%] rounded" />
        <button type='submit' className="font-semibold mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Add Food
        </button>
      </form>

    </div>
  );
}

export default AddFood

