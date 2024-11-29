"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SlideInChechout from "@/components/SlideInCheckout";


const Cart = ({ cart_products,mess }) => {
    console.log(mess)
    console.log(cart_products)
  const [items, setItems] = useState(cart_products);
  const [checkout,setCheckout]=useState(false);
  const updateQuantity = (id, delta) => {
    setItems(
      items.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen items-center justify-center bg-[#101828]">
      {cart_products.length>0?(<Card className="mx-auto w-[90%] max-w-4xl overflow-hidden bg-[#233250] text-white shadow-xl">
        <div className="p-6">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            Your Cart{" "}
            <span role="img" aria-label="thumbs up">
              👍
            </span>
          </h1>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                className="flex items-center gap-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="h-20 w-20 overflow-hidden rounded-lg bg-white/10"
                >
                  <Image
                    src={item.product.imageUrll}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{item.user.name}</p>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-lg font-bold">Rs {item.product.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item._id, -1)}
                    className="rounded-full bg-white/10 p-1 hover:bg-white/20"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </motion.button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item._id, 1)}
                    className="rounded-full bg-white/10 p-1 hover:bg-white/20"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">Total</span>
              <span className="text-2xl font-bold">Rs {total}</span>
            </div>
          </div>

          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="w-full bg-white text-[#101828] hover:bg-white/90" onClick={()=>{setCheckout(true)}}>
              Proceed to checkout
            </Button>
          </motion.div>
        </div>
      </Card>):
       <div className="text-center text-white">
       <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
       <p className="mt-2 text-gray-300">Add some items to get started!</p>
     </div>}
      <AnimatePresence>
        {checkout && (
          <SlideInChechout onClose={() =>setCheckout(false)} total_price={total} cart={cart_products}/>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/cartItem");
  const data = await response.json();

  return {
    props: {
      cart_products: data.cart,
      mess:data.mess
    },
  };
}

export default Cart;
