import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl backdrop-blur-xl backdrop-brightness-103 border-solid border-2 border-t-white border-l-white border-b-white/10 border-r-transparent p-16">
        <h1 className="text-6xl font-signika font-medium text-black drop-shadow-2xl mb-4">
          404
        </h1>
        <h2 className="text-3xl font-signika font-light text-black drop-shadow-2xl mb-8">
          Page Not Found
        </h2>
        <p className="text-xl font-signika font-light text-black/70 text-center mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-black/10 hover:bg-black/20 text-black font-signika font-light rounded transition-colors duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
