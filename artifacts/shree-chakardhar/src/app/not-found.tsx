import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="grid min-h-[70svh] place-items-center bg-ivory px-4 pt-24 text-center">
      <div>
        <p className="eyebrow text-copper">404</p>
        <h1 className="display mt-3 text-5xl">That page has left the garage.</h1>
        <Link href="/cars" className="btn btn-copper mt-8">
          Explore Cars
        </Link>
      </div>
    </main>
  );
}
