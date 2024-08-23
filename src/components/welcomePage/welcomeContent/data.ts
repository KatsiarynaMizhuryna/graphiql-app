import { title } from 'process';

export const data = {
  aboutProject: {
    title: 'ABOUT PROJECT',
    description:
      'This project aims to create a unified client for both REST and GraphQL requests, merging the functionalities of Postman and GraphiQL into one application. It features an intuitive interface for selecting HTTP methods, managing headers, and testing GraphQL queries with real-time feedback. Designed for ease of use, it enhances API interaction and supports saving requests to improve workflow efficiency.'
  },
  aboutAuthors: {
    title: 'ABOUT AUTHORS',
    authors: [
      {
        id: 1,
        name: 'Katsiaryna Mizhuryna',
        linkGit: 'https://github.com/KatsiarynaMizhuryna',
        rule: 'Front-End Developer'
      },
      {
        id: 2,
        name: 'Anzhelika Turlak',
        linkGit: 'https://github.com/Anzhelika007',
        rule: 'Front-End Developer'
      },
      {
        id: 3,
        name: 'Daria Shilnikova',
        linkGit: 'https://github.com/Dasha2101',
        rule: 'Front-End Developer'
      }
    ]
  },
  aboutCourse: {
    title: 'ABOUT COURSE',
    content: [
      {
        title: 'FOR EVERYONE',
        imgSrc: '/icon/free-learning.png',
        alt: 'Documentation course',
        description:
          'Everyone can study at RS School, regardless of age, professional employment, or place of residence'
      },
      {
        title: 'MATERIALS',
        imgSrc: '/icon/documentation.png',
        alt: 'Documentation course',
        description:
          'All materials are publicly available on the YouTube channel and GitHub'
      },
      {
        title: 'FREE EDUCATION',
        imgSrc: '/icon/education.png',
        alt: 'Education course',
        description: 'Feel the desire to share your experience and knowledge'
      },
      {
        title: 'CERTIFICATE',
        imgSrc: '/icon/certificate.png',
        alt: 'Documentation course',
        description:
          'After successful completion of the course, students will receive an electronic certificate.'
      }
    ]
  }
};
