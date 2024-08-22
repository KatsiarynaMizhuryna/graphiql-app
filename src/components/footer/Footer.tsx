import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="flex items-center justify-around space-x-4 py-5 px-10">
      <Link
        href={'https://github.com/KatsiarynaMizhuryna/graphiql-app'}
        target="_blank"
      >
        <Image
          src="/github-logo.png"
          alt="logo"
          width={70}
          height={70}
          data-testid="github-logo"
        />
      </Link>
      <div className="font-bold text-[30px]" data-testid="year-text">
        2024
      </div>
      <Link href={'https://rs.school/'} target="_blank">
        <Image
          src="/rs-school-js.svg"
          alt="logo-course"
          width={120}
          height={70}
          data-testid="rs-logo"
        />
      </Link>
    </div>
  );
};
