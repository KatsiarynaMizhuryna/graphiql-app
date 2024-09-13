import { TextButtonProps } from '@/interfaces/textButtonProps';

const TextButton: React.FC<TextButtonProps> = ({
  buttonText,
  onClick,
  isActive = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg ${isActive ? 'bg-red-600' : 'bg-gray-500'} text-white`}
    >
      {buttonText}
    </button>
  );
};
export default TextButton;
