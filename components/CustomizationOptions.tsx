const CustomizationOptions = ({ options, onChange }) => {
  const handleOptionChange = (optionId, selected) => {
    onChange((prev) => {
      if (selected) {
        return [...prev, optionId];
      }
      return prev.filter((id) => id !== optionId);
    });
  };

  if (!options) return <div>Loading customizations...</div>;

  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          <span>{option.name}</span>
          <input
            type="checkbox"
            onChange={(e) => handleOptionChange(option.id, e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomizationOptions;