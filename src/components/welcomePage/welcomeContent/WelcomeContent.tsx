import Image from 'next/image';
import Link from 'next/link';
import { nunito, oswald, ubuntu } from '@/ui/fonts';
import { LinkButton } from '@/ui/linkButton';
import { data } from './data';

export const WelcomeContent = () => {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-end gap-4">
        <LinkButton href="/login">Sign In</LinkButton>
        <LinkButton href="/registration">Sign Up</LinkButton>
      </div>
      <div className="grid  grid-flow-col gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
        <div className=" max-w-[700px]">
          <h1 className={`${oswald.className} text-4xl font-bold mb-10`}>
            {data.aboutProject.title}
          </h1>
          <div className="text-justify">{data.aboutProject.description}</div>
        </div>
        <div className=" max-w-[700px]">
          <h2 className={`${oswald.className} text-4xl font-bold mb-10`}>
            {data.aboutAuthors.title}
          </h2>
          {data.aboutAuthors.authors.map((author) => (
            <div key={author.id}>
              <Link href={author.linkGit} target="_blank" className="inline">
                <Image
                  src="/icon/github-red.png"
                  alt={`GitHub profile of ${author.name}`}
                  width={30}
                  height={30}
                  className="inline rounded-[10px] mr-4 transform hover:scale-105 hover:shadow-custom-dark transition-transform duration-200"
                  data-testid={`gitHub${author.name.replace(' ', '')}`}
                />
              </Link>
              <span className={`${ubuntu.className} text-lg sm:text-xl md:text-2xl font-bold`}>
                {author.name}
                <span className={`${nunito.className} text-base sm:text-lg md:text-xl font-bold`}>
                &#32;- {author.rule}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="row-span-2 col-span-2 shrink md:order-3">
          <h2 className={`${oswald.className} text-4xl font-bold mb-10`}>
            {data.aboutCourse.title}
          </h2>
          <div className="text-justify">
            {data.aboutCourse.content.map((block) => (
              <div key={block.title} className="mb-7">
                <h3 className={`${ubuntu.className} text-2xl font-bold mb-2`}>
                  {block.title}
                </h3>
                <div className="flex items-center">
                  <Image
                    src={block.imgSrc}
                    alt={block.alt}
                    width={30}
                    height={30}
                    className="inline mr-4 transform hover:scale-105 transition-transform duration-200"
                    data-testid="documentationCourse"
                  />
                  <div>{block.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
