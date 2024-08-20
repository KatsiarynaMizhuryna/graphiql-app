import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <div>
      <Link href={'#'}>
        <Image src={'/welcome.png'} alt="logo" width={100} height={100} />
      </Link>
    </div>
  );
};
