import React from "react";
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";


const ProductPage = ({ product }) => {
    
    const [isExpanded, setIsExpanded] = useState(false)
  if (!product) {
    return <p>Product not found!</p>;
  }
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#243961] to-[#1B2B4D] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        <div className="flex flex-col md:flex-row">
          <motion.div 
            className="md:w-1/2 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={product.imageUrll} alt={product.name} className="w-full h-full object-cover" />
            <motion.div 
              className="absolute top-4 left-4 bg-white rounded-full p-2 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={24} className="text-[#1B2B4D]" />
            </motion.div>
          </motion.div>
          <div className="md:w-1/2 p-8">
            <motion.h1 
              className="text-4xl font-bold mb-4 text-[#1B2B4D]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {product.name}
            </motion.h1>
            <motion.div 
              className="text-3xl font-semibold mb-6 text-[#243961]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ${product.price.toFixed(2)}
            </motion.div>
            <motion.p 
              className={`text-gray-600 mb-8 ${isExpanded ? '' : 'line-clamp-3'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {product.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                variant="link" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mb-4 text-[#243961]"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button className="w-full bg-[#1B2B4D] hover:bg-[#243961] text-white" >
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;

// Pre-generate paths for all products
export async function getStaticPaths() {
  // Fetch all products to generate paths
  const response = await fetch("http://localhost:3000/api/getProduct");
  const data = await response.json();

  const paths = data.prod.map((product) => ({
    params: { id: product._id.toString() }, // Convert `_id` to string for URL
  }));

  return {
    paths,
    fallback: false, // Return 404 for undefined paths
  };
}

// Fetch data for individual product
export async function getStaticProps({ params }) {
  const { id } = params; // Extract `id` from the URL
  const response = await fetch("http://localhost:3000/api/getProduct", {
    method: "POST", // Use POST for filtering by ID
    body: JSON.stringify({ id, status: "id" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return {
    props: {
      product: data.product || null, // Pass product data to the page
    },
  };
}
