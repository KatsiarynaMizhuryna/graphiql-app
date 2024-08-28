// import { LinkButton } from '@/ui/linkButton';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h2
            data-testid="not-found-title"
            className="text-3xl font-bold text-red-600 mb-4"
          >
            Not Found
          </h2>
          <p
            data-testid="not-found-message"
            className="text-lg text-gray-700 mb-6"
          >
            Could not find requested resource
          </p>
          {/* <LinkButton href="/"
          data-testid="home-button"
          className="inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
        >
          Return Home
        </LinkButton> */}
        </main>
      </body>
    </html>
  );
}
