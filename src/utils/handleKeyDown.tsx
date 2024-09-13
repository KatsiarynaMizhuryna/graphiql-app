import { handleKeyDownProps } from '@/interfaces/handleKeyDown';

const handleKeyDown = ({ e, setQuery }: handleKeyDownProps) => {
  const { key, target } = e;
  const textarea = target as HTMLTextAreaElement;
  const { selectionStart, selectionEnd } = textarea;
  const value = textarea.value;
  if (key === '{' || key === '[' || key === '(' || key === '"') {
    e.preventDefault();

    let closingChar = '';
    switch (key) {
      case '{':
        closingChar = '}';
        break;
      case '[':
        closingChar = ']';
        break;
      case '(':
        closingChar = ')';
        break;
      case '"':
        closingChar = '"';
        break;
      default:
        break;
    }

    const newValue =
      value.substring(0, selectionStart) +
      key +
      closingChar +
      value.substring(selectionEnd);
    setQuery(newValue);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
    }, 0);
  }

  if (key === 'Backspace' || key === 'Delete') {
    const previousChar = value[selectionStart - 1];
    const nextChar = value[selectionStart];
    const pairs: { [key: string]: string } = {
      '{': '}',
      '[': ']',
      '(': ')',
      '"': '"'
    };

    if (previousChar in pairs && pairs[previousChar] === nextChar) {
      if (key === 'Backspace') {
        e.preventDefault();
        const newValue =
          value.substring(0, selectionStart - 1) +
          value.substring(selectionEnd + 1);
        setQuery(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
        }, 0);
      }
      if (key === 'Delete') {
        e.preventDefault();
        const newValue =
          value.substring(0, selectionStart) +
          value.substring(selectionEnd + 1);
        setQuery(newValue);
      }
    }
  }
};

export default handleKeyDown;
