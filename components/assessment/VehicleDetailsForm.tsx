import { useForm } from 'react-hook-form';

const VehicleDetailsForm = ({ vehicleDetails, onChange }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: vehicleDetails,
  });

  const onSubmit = (data) => {
    onChange(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Make</label>
        <input {...register('make')} />
      </div>
      <div>
        <label>Model</label>
        <input {...register('model')} />
      </div>
      <div>
        <label>Year</label>
        <input type="number" {...register('year')} />
      </div>
      <div>
        <label>Condition</label>
        <input {...register('condition')} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default VehicleDetailsForm;