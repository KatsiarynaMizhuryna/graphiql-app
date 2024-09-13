import { handleToggleVisibilityProps } from '@/interfaces/graphQl';

const handleToggleVisibility = ({
  setIsVisible,
  isVisible
}: handleToggleVisibilityProps) => {
  setIsVisible(!isVisible);
};

export default handleToggleVisibility;
