import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Graph QL',
    default: 'Graph QL'
  },
  description: 'RS School Training Project',
  metadataBase: new URL('https://rs.school/courses/reactjs'),
};



export default function Head() {
  return (
    <>
      <title>Home | Graph QL</title>
      <meta name="description" content="RS School Training Project" />
    </>
  );
}