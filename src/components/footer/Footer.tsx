import Link from 'next/link';
import Image from 'next/image';
export const Footer = () => {
  return (
    <div className="flex items-center justify-around space-x-4">
      <Link
        href={'https://github.com/KatsiarynaMizhuryna/graphiql-app'}
        target="_blank"
      >
        <Image src="/github-logo.png" alt="logo" width={100} height={100} />
      </Link>
      <p>2024</p>
      <Link href={'https://rs.school/'} target="_blank">
        <Image
          src="/rs-school-js.svg"
          alt="logo-course"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
};
