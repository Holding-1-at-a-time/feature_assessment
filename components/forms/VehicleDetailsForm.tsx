import { useForm } from 'react-hook-form';

const VehicleDetailsForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('make')} placeholder="Make" required />
      <input {...register('model')} placeholder="Model" required />
      <input {...register('year')} placeholder="Year" type="number" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VehicleDetailsForm;