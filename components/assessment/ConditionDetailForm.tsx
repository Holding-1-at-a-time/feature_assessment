import { useForm } from 'react-hook-form';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const ConditionDetailForm = ({ activeHotspot }) => {
  const { register, handleSubmit } = useForm();
  const addConditionDetail = useMutation(api.assessments.addConditionDetail);

  const onSubmit = async (data) => {
    await addConditionDetail({ ...data, hotspot: activeHotspot });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('issueType')} placeholder="Issue Type" />
      <input {...register('severity')} placeholder="Severity" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConditionDetailForm;