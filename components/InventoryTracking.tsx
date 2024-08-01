import { useQuery, useMutation } from 'convex/react';
import { getInventoryItems, updateInventoryItem } from '../convex/functions';

const InventoryTracking = () => {
  const inventoryItems = useQuery(getInventoryItems);
  const updateInventoryItemMutation = useMutation(updateInventoryItem);

  const handleUpdateInventory = async (itemId, newQuantity) => {
    await updateInventoryItemMutation({ itemId, quantity: newQuantity });
  };

  return (
    <div>
      <h1>Inventory Tracking</h1>
      <ul>
        {inventoryItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleUpdateInventory(item.id, item.quantity - 1)}>Decrease Quantity</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryTracking;