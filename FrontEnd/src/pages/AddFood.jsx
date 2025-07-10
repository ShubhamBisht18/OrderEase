import { useForm } from 'react-hook-form';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function AddFood() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

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
    <div className='h-full w-full relative'>
      <div className='h-[35%] bg-orange-400'></div>
      <div className='h-[65%] bg-white'></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
             h-fit w-[300px] flex justify-center items-center flex-col gap-4 bg-white rounded-lg shadow-lg p-6"
      >
        <div className="w-full">
          <input
            placeholder='Name'
            {...register('name', { required: 'Name is required' })}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="w-full">
          <input
            placeholder='Image URL'
            {...register('image', { required: 'Image URL is required' })}
            className="border p-2 w-full rounded"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <div className="w-full">
          <input
            type='number'
            placeholder='Price'
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Price must be at least ₹1' }
            })}
            className="border p-2 w-full rounded"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <button
          type='submit'
          className="font-semibold mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;
