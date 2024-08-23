import { InputProps } from '@/interfaces/Input';

const Input: React.FC<InputProps> = ({ type, placeholder, ...props }) => {
  return (
    <input
      type={type}
      className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder={placeholder}
      {...props}
    />
  );
};
export default Input;
