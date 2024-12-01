import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export const PetSitterCard = ({ petsitter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lastTouchTime, setLastTouchTime] = useState(0);

  const handleTouch = () => {
    const now = new Date().getTime();
    if (now - lastTouchTime < 300) {
      // Double tap detected within 300ms, navigate to details page
      window.location.href = `/petsitters/${petsitter._id}`;
    } else {
      // Single tap detected, show hover effect
      setIsHovered(!isHovered);
    }
    setLastTouchTime(now);
  };

  return (
    <Link href={`/petsitters/${petsitter._id}`} passHref>
      <div 
        className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-[300px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchEnd={handleTouch}
      >
        <div className="relative w-full h-full">
          <Image
            src={petsitter.imageUrl}
            alt={`Pet Sitter ${petsitter.user}`}
            fill
            className={`object-cover transition-all duration-300 ${isHovered ? 'opacity-30' : 'opacity-100'}`}
          />
          
          {isHovered && (
            <div className="absolute inset-0 p-4 bg-black bg-opacity-50 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-xl font-semibold mb-2">Pet Types:</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {petsitter.pet_type.map((type) => (
                    <span key={type} className="px-2 py-1 bg-blue-500 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
                <p className="mb-2">Experience: {petsitter.experience} years</p>
                <p className="mb-2">Rate: ${petsitter.hourly_rate}/hour</p>
                <p className="mb-2">Location: {petsitter.location.address}</p>
                <p>Availability: {petsitter.availability}</p>
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-current" />
                <span className="ml-1">{petsitter.rating || 'New'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
