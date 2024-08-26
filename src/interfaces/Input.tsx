export interface InputProps {
  id: string;
  type: string;
  required: boolean;
  autoComplete: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  error?: boolean;
}
