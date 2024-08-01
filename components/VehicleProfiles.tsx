import { useQuery, useMutation } from 'convex/react';
import { Button, Input, Form, List, ListItem } from 'shadcn-ui';
import Image from 'next/image';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../convex/functions';
import { useState } from 'react';

const VehicleProfiles = () => {
  const vehicles = useQuery(getVehicles);
  const addVehicleMutation = useMutation(addVehicle);
  const updateVehicleMutation = useMutation(updateVehicle);
  const deleteVehicleMutation = useMutation(deleteVehicle);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleAddVehicle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newVehicle = {
      make: formData.get('make'),
      model: formData.get('model'),
      year: formData.get('year'),
      image: formData.get('image'),
    };
    await addVehicleMutation(newVehicle);
  };

  const handleUpdateVehicle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedVehicle = {
      id: editingVehicle.id,
      make: formData.get('make'),
      model: formData.get('model'),
      year: formData.get('year'),
      image: formData.get('image'),
    };
    await updateVehicleMutation(updatedVehicle);
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = async (id) => {
    await deleteVehicleMutation({ id });
  };

  return (
    <div>
      <h1>Vehicle Profiles</h1>
      <Form onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}>
        <Input name="make" placeholder="Make" defaultValue={editingVehicle?.make} required />
        <Input name="model" placeholder="Model" defaultValue={editingVehicle?.model} required />
        <Input name="year" placeholder="Year" defaultValue={editingVehicle?.year} required />
        <Input name="image" placeholder="Image URL" defaultValue={editingVehicle?.image} required />
        <Button type="submit">{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</Button>
      </Form>
      <List>
        {vehicles.map(vehicle => (
          <ListItem key={vehicle.id}>
            <Image src={vehicle.image} alt={vehicle.make} width={100} height={100} />
            <div>{vehicle.make} {vehicle.model}</div>
            <Button onClick={() => setEditingVehicle(vehicle)}>Edit</Button>
            <Button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default VehicleProfiles;