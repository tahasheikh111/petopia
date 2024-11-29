 import { Search, Heart, Plus, Minus } from 'lucide-react'
 import { useState } from 'react'
 import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';


const ProductCard = ({ product, quantity, updateQuantity }) => {
 
  const r=useRouter();
  const { data: session } = useSession();
  const btnhandler3=()=>{
    if (session) {
      // console.log(quantity,session.user.email);
 fetch("/api/cartItem",{
  method:"POST",
  body:JSON.stringify({
    product:product,
    quantity:quantity,
    user:session.user,
  }),
  headers: {
    "Content-Type": "application/json",
  },
 }).then((res)=>res.json())
.then((data)=>{alert(data.message)})
     
    }
    

    r.push(`/Cart`);
  }
  return(
  
    <div
      key={product.id}
      className="group relative bg-white rounded-lg overflow-hidden w-full max-w-[375px]"
      style={{ height: '447px' }}
    >
      <div className="relative h-full">
        <Image src={product.imageUrll} alt={product.name}  objectFit="cover" width="449" height="447" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4">
            <button className="text-white hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <span className="text-white text-2xl font-medium">{product.price}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-white text-2xl font-semibold mb-2">{product.name}</h2>
            {/* {console.log(product._id,"hellooooooooo")} */}
            <p className="text-white/80 text-sm mb-6">{product.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center bg-[#1B2B4D] rounded-md">
                <button
                  onClick={() => updateQuantity(product._id, false)}
                  className="p-2 text-white hover:bg-[#243961] rounded-l-md"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-white">{quantity || 1}</span>
                <button
                  onClick={() => updateQuantity(product._id, true)}
                  className="p-2 text-white hover:bg-[#243961] rounded-r-md"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={btnhandler3}className="bg-[#1B2B4D] text-white px-6 py-2 rounded-md hover:bg-[#243961] transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  export default ProductCard