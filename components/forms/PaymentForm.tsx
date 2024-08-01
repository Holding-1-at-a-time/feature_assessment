import { useForm } from 'react-hook-form';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const PaymentForm = () => {
  const { register, handleSubmit } = useForm();
  const processPayment = useMutation(api.processPayment);

  const onSubmit = async (data) => {
    await processPayment(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('cardNumber')} placeholder="Card Number" required />
      <input {...register('expiryDate')} placeholder="Expiry Date" required />
      <input {...register('cvc')} placeholder="CVC" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentForm;