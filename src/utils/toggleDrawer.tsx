import { toggleDrawerProps } from '@/interfaces/graphQl';

const toggleDrawer = ({ isDrawerOpen, setIsDrawerOpen }: toggleDrawerProps) => {
  setIsDrawerOpen(!isDrawerOpen);
};

export default toggleDrawer;
