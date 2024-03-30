import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSecond() {
  return (
    <section className="relative h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/hero.png"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      </div>
      <div className="z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">
          nomad-io
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mt-4 md:mt-6 lg:mt-8">
          Explore new location and embrace your journey with us
        </p>
        <Button variant="outline" className="mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M17.303 5.197A7.5 7.5 0 0 0 6.697 15.803a.75.75 0 0 1-1.061 1.061A9 9 0 1 1 21 10.5a.75.75 0 0 1-1.5 0c0-1.92-.732-3.839-2.197-5.303Zm-2.121 2.121a4.5 4.5 0 0 0-6.364 6.364.75.75 0 1 1-1.06 1.06A6 6 0 1 1 18 10.5a.75.75 0 0 1-1.5 0c0-1.153-.44-2.303-1.318-3.182Zm-3.634 1.314a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2.5">
            <Link href="/places">Discover Now</Link>
          </span>
        </Button>
      </div>
    </section>
  );
}
