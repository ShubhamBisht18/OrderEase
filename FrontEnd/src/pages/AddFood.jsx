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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder='Name' {...register('name')} required />
      <input placeholder='Image URL' {...register('image')} required />
      <input type='number' placeholder='Price' {...register('price')} required />
      <button type='submit'>Add Food</button>
    </form>
  );
}

export default AddFood