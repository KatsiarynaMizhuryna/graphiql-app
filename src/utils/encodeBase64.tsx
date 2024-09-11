import toast from 'react-hot-toast';

const encodeBase64 = (data: string) => {
  try {
    return btoa(data);
  } catch (error) {
    console.error('Error encoding to base64:', error);
    toast.error('Error encoding to base64');
    return '';
  }
};

export default encodeBase64;
