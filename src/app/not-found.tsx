import { LinkButton } from '@/ui/linkButton';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-x-4 py-5 px-10">
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
        <LinkButton href="/login"
          data-testid="home-button"
          className="inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
        >
          Return Home
        </LinkButton>
    </div>
  );
}