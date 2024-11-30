// components/Landing.js
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around p-2 bg-white">
      
      {/* Left Side - Image and Yellow Circle */}
      <div className="relative flex-shrink-0">
        
        {/* Yellow Circle */}
        <div className="absolute inset-0 m-auto w-48 h-48 md:w-64 md:h-64 bg-yellow-400 rounded-full z-0" />
        
        {/* Cat Image */}
        <Image
          src="/landing.png" // Replace with the path to your cat image
          alt="Cute Cat"
          width={400}
          height={400}
          className="relative z-10"
        />
        
        {/* Information Tags */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-30">
          <Link href="/Shop">
            <p className="font-semibold text-black">Shop</p>
          </Link>
        </div>
        <div className="absolute bottom-1/3 left-3/4 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-md z-30">
          <Link href="/adoption">
            <p className="font-semibold text-black text-right">Adoption</p>
          </Link>
        </div>
        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-md z-30">
          <Link href="/petsitters">
            <p className="font-semibold text-black">Sitter</p>
          </Link>
        </div>
      </div>

      {/* Right Side - Text and Button */}
      <div className="mt-8 md:mt-0 md:ml-8 text-center md:text-left max-w-md">
        <h1 className="text-yellow-500 text-3xl md:text-5xl font-bold">For Pets, For Love 
        All in One Place!</h1>
        <p className="mt-4 text-gray-700">
        Welcome to Petopia! Your all-in-one pet hub for adoption, shopping, and sitter services. Discover lovable pets waiting for a home, top-quality products, and trusted sitters who treat your pets like family. Petopia - because your pet deserves the best!
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
