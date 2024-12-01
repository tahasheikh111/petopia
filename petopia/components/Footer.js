import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-start">
          {/* Logo and Email Input */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <Image 
              src="/logo-removebg.png" 
              alt="Logo" 
              width={48} 
              height={48} 
              className="w-12 h-12 mb-4" 
            />
            <div className="flex items-center bg-yellow-500 border-2 border-rose-200 rounded-full p-1 max-w-xs">
              <input
                type="email"
                placeholder="Send an email to us"
                className="bg-transparent outline-none flex-grow px-4 py-2"
              />
              <button className="bg-yellow-400 rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-purple-900" />
              </button>
            </div>
            <div className="flex mt-4 space-x-2">
              <Link href="#" className="bg-rose-200 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="#" className="bg-rose-200 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Link>
              <Link href="#" className="bg-rose-200 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="#" className="bg-rose-200 rounded-full p-2">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            {/* Information Links */}
            <div className="w-1/2 mb-6 md:mb-0 pr-4">
              <h3 className="font-bold mb-4">Information</h3>
              <ul className="space-y-2">
                <li><Link href="#">Pricing Page</Link></li>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Functionalities</Link></li>
                <li><Link href="#">Models</Link></li>
              </ul>
            </div>

            {/* Company Details */}
            <div className="w-1/2">
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#">Location</Link></li>
                <li><Link href="#">Admins</Link></li>
                <li>Lahore, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-rose-200 border-dashed">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <p>© Petopia 2024</p>
          <div className="flex items-center space-x-2">
            <span>🇵🇰 Pakistan</span>
            <select className="bg-transparent border-none">
              <option>PKR</option>
              {/* Add other currency options as needed */}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
