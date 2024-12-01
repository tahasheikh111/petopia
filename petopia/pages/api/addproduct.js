import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { createClient } from '@supabase/supabase-js';


export default async function handler(req,res){
   await dbConnect(); 
    debugger;
   if(req.method==='POST'){
    
    const {prod_name,prod_price,prod_description,prod_category,prod_image}=req.body;
    // console.log("data aya hai",req.body)
    console.log("data hue",req.body)
   const newProduct= new Product({
    name:prod_name,
    price:prod_price,
    description:prod_description,
    category:prod_category,
    imageUrll:prod_image,
   });
   await newProduct.save();
    res.status(200).json({message:"agya maal agya or data save hogya",data11:req.body})
   }
   else if (req.method === 'GET') {
      const { status, id } = req.body;
    
      if (status === 'id') {
        try {
          const product = await Product.findById(id); 
          if (!product) {
            return res.status(404).json({ message: 'Product not found' }); 
          }
          return res.status(200).json({ prod:product });
        } catch (error) {
          return res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
      }
    
      try {
        
        const products = await Product.find({});
        return res.status(200).json({ prod: products, message: 'Data received' });
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
      }
    }
    

}