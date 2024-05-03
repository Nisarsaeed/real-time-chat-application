
export const Input = ({ 
    type = '',
    placeholder = '',
    isRequired = true,
    value = '',
    className ='',
    onChange = ()=>{},
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 my-4 p-2.5
      ${className}`}
      required={isRequired}
      value={value}
      onChange={onChange}
    />
  );
};
