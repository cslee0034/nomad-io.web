import { useRouter } from "next/router";
import { Button } from "../components/ui/button";

export default function NotFount() {
  const router = useRouter();

  return (
    <div className="container relative flex h-full flex-col items-center justify-center py-20 text-center sm:py-32">
      <p className="text-2xl font-bol">404</p>
      <h1 className="mt-2 text-3xl font-medium">Page not found</h1>
      <div className="flex mt-6">
        <Button className="mx-1" onClick={() => router.back()}>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="px-1">Back</p>
          </div>
        </Button>
        <Button
          variant="outline"
          className="mx-1"
          onClick={() => router.push("/")}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
