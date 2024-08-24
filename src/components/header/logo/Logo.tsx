import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <div>
      <Link href={'/'}>
        <Image
          src={'/icon/welcome.png'}
          alt="logo"
          width={100}
          height={100}
          className="mr-4 transform hover:scale-105 transition-transform duration-200"
        />
      </Link>
    </div>
  );
};
