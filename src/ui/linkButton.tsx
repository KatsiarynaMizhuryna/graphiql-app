import Link from 'next/link';

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const LinkButton = ({ href, children }: LinkButtonProps) => {
  const linkClasses =
    'inline-block px-6 py-3 bg-red-500 text-white font-medium text-sm rounded-lg hover:bg-red-600 transition-colors bg-gradient-radial text-center';
  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
};
