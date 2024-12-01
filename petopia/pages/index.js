// pages/index.js
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';
import DetectUserLocation from '@/components/DetectUserLocation';
import SeedUser from '@/components/SeedUser';
import { FeaturedPetSitters } from '@/components/FeaturedPetSitters';
import Footer from '@/components/Footer';

export default function HomePage(props) {
  return (
    <div className="relative bg-white w-full min-h-screen"> {/* min-h-screen instead of h-screen */}
      <DetectUserLocation />
      {/* Navbar */}
      <div className="absolute w-full z-50">
        <Navbar />
      </div>
      
      {/* Landing Component */}
      <div className="w-full h-auto"> {/* Added padding for spacing */}
        <Landing />
      </div>
    

      {/* Featured Pet Sitters Component */}
      <div className="w-full h-auto">
        <FeaturedPetSitters />
      </div>
      <Footer/>
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

  return {
    props: { session },
  };
}
