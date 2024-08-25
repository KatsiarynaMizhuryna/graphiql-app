import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer
      className="container mx-auto flex items-center justify-between px-20 py-5"
      data-testid="footer"
    >
      <Link
        href={'https://github.com/KatsiarynaMizhuryna/graphiql-app'}
        target="_blank"
      >
        <Image
          src="/icon/github-logo.png"
          alt="logo"
          width={70}
          height={70}
          className="rounded-[50%] mr-4 transform hover:scale-105 hover:shadow-custom-dark transition-transform duration-200"
          data-testid="github-logo"
        />
      </Link>
      <div className="font-bold text-[30px]" data-testid="year-text">
        2024
      </div>
      <Link href={'https://rs.school/'} target="_blank">
        <Image
          src="/icon/rs-school-js.svg"
          alt="logo-course"
          width={120}
          height={70}
          className="mr-4 transform hover:scale-105 transition-transform duration-200"
          data-testid="rs-logo"
        />
      </Link>
    </footer>
  );
};
