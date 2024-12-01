import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { createClient } from '@supabase/supabase-js';


export default async function handler(req,res){
   await dbConnect(); 
      const { id } = req.query;
      console.log("hello",req.query)

      try {
         if (id) {
           const product = await Product.findById(id);
           if (!product) {
             return res.status(404).json({ error: "Product not found" });
           }
           return res.status(200).json({ product });
         }
       } catch (error) {
         return res.status(500).json({ error: "Server error" });
       }
     
}
   
