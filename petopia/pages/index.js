// pages/index.js
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';

export default function HomePage(props) {
  return (
    <div className="relative bg-white w-full h-screen">
      
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      
      {/* Landing Component */}
      <div className="w-full h-full">
        <Landing />
      </div>

    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect to login if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Pass session data to the page as props if needed
  return {
    props: { session },
  };
}
