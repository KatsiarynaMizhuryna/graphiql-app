import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='max-sm:pt-3'>
      <Link href={'/'}>
        <Image
          src={'/icon/welcome1.png'}
          alt="logo"
          width={100}
          height={100}
          className="mr-4 transform hover:scale-105 transition-transform duration-200 max-sm:max-w-15 max-sm:max-h-[70px]"
        />
      </Link>
    </div>
  );
};
