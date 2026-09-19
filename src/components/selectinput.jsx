export function SelectInput({
  icon,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
      
      {icon && <div className="flex items-center">{icon}</div>}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-sm text-gray-700"
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}