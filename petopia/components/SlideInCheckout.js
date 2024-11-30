import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SlideInCheckout({ onClose, total_price,cart }) {
    
    const btnhandler4=()=>{
        
        fetch("/api/cartItem", {
            method: "POST",
            body: JSON.stringify({ cart: cart, check: "update" }), // Sends cartID and a "check" field
            headers: {
                "Content-Type": "application/json", // Ensures JSON is properly interpreted
            },
        })
        .then((res) => res.json()) // Parses the response to JSON
        .then((data) => console.log(data)) // Logs the response data
        .catch((error) => console.error("Error:", error)); // Adds error handling

        onClose();
    }
  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed top-0 right-0 h-full w-[35%] bg-[#233250] text-white shadow-xl overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <form onSubmit={btnhandler4} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                name="name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-white">Address</Label>
              <Textarea
                id="address"
                name="address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter your full address"
                required
              />
            </div>

            <motion.div
              className="bg-white/20 p-4 rounded-lg shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Label htmlFor="price" className="text-white text-lg mb-2 block">Final Price</Label>
              <motion.div
                className="text-3xl font-bold text-yellow-300"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                Rs {total_price}
              </motion.div>
              <motion.div
                className="w-full h-1 bg-yellow-300 mt-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              />
            </motion.div>

            <Button type="submit" className="w-full bg-white text-[#101828] hover:bg-white/90">
              Place Order
            </Button>
          </form>
        </div>
      </motion.div>
    </>
  )
}

