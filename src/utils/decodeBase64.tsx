import toast from 'react-hot-toast';

const decodeBase64 = (encodedString: string) => {
  try {
    return decodeURIComponent(atob(encodedString));
  } catch (e) {
    console.error('Error decoding base64 string:', e);
    toast.error('Error decoding base64');
    return '';
  }
};

export default decodeBase64;
