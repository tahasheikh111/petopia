import Product from "@/models/Product";

export default async function handler(req,res){
    debugger;
   if(req.method==='POST'){
    
    const {prod_name,prod_price,prod_description,prod_category}=req.body;
    // console.log("data aya hai",req.body)
   const newProduct= new Product({
    name:prod_name,
    price:prod_price,
    description:prod_description,
    category:prod_category,
   });
   await newProduct.save();
    res.status(200).json({message:"agya maal agya or data save hogya",data11:req.body})
   }
   
}