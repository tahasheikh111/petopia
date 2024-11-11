import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBagIcon, UserGroupIcon, PhoneIcon, PencilAltIcon, LogoutIcon } from '@heroicons/react/solid';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="z-50">
      <div className="bg-transparent flex items-center justify-between p-2">
        {/* Logo */}
        <div className="flex-1 items-center">
          <Image src="/logo-removebg.png" alt="Logo" width={78} height={78} />
        </div>

        {/* Navigation Links with Icons */}
        <div className="flex space-x-8 ml-4">
          <Link href="/wearable" className="flex items-center">
            <ShoppingBagIcon className="h-6 w-6 text-black" />
            <span className="hidden md:block text-black">Shop</span>
          </Link>
          <Link href="/aboutus" className="flex items-center">
            <UserGroupIcon className="h-6 w-6 text-black" />
            <span className="hidden md:block text-black">Services</span>
          </Link>
          <Link href="/contactus" className="flex items-center">
            <PhoneIcon className="h-6 w-6 text-black" />
            <span className="hidden md:block text-black">Forum</span>
          </Link>
          <Link href="/blog" className="flex items-center">
            <PencilAltIcon className="h-6 w-6 text-black" />
            <span className="hidden md:block text-black">Blog</span>
          </Link>
          {/* <button onClick={() => signOut()} className="flex items-center">
            <LogoutIcon className="h-6 w-6 text-red-950" />
            <span className="hidden md:block text-red-950">Logout</span>
          </button> */}
        </div>

        {/* Button to Open Sidebar */}
        <button
          onClick={toggleSidebar}
          className="bg-yellow-300 rounded-full ml-2 text-black flex items-center"
        >
          <svg className="h-6 w-6">
            <path d="M6 8l6 6 6-6H6z" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute right-0 bg-white w-64 h-full p-6 shadow-lg border-l border-gray-200 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Services</h2>
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Launch Shop</li>
              <Link href="/PetSitter/become-pet-sitter">
                <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">
                  Become a Sitter
                </li>
              </Link>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Start Clinic</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Become Trainer</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-black">Account</h2>
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Profile</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Settings</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Shop</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Sitter</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Clinic</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer rounded text-black">Trainer</li>
              <li
                className="p-2 hover:bg-yellow-300 text-yellow-500 bg-yellow-100 cursor-pointer rounded"
                onClick={() => signOut()}
              >
                Logout
              </li>
            </ul>
            <button
              onClick={toggleSidebar}
              className="mt-6 bg-yellow-400 text-black p-2 rounded w-full"
            >
              Close
            </button>
          </div>

          {/* Overlay */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
