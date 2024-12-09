import User from '@/models/User';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import CartItem from '@/models/CartItem';
import Order from '@/models/Order';




dbConnect();

export default async function handler(req,res){
    if(req.method==='POST'){
        const {product,quantity,user}=req.body;
        
        const {cart,check}=req.body;
        console.log("gg",cart);
        
        if (check === 'update') {
            console.log("i am in update")
            for (const item of cart) {
                const cartId = item._id; // Extract the _id field
                const exist = await CartItem.findById(cartId); // Use the extracted _id
        
                if (!exist) {
                    return res.status(404).json({ message: `Cart item with ID ${cartId} not found` });
                }
             const order=new Order({
                product:item.product._id,
                user:item.user._id,
                quantity:item.quantity
             })
             await order.save();
             await CartItem.findByIdAndDelete(cartId);
             

            }
        
            return res.status(200).json({ message: 'Cart item added in order and delete from cart' });
        }  


        const existingCartItem = await CartItem.findOne({
            user: user.id,
            product: product._id, 
        });
        if (existingCartItem) {
            // If the item exists, update the quantity
            existingCartItem.quantity += quantity;
            existingCartItem.status="Pending";
            await existingCartItem.save();
            return res.status(200).json({ message: "Cart item updated successfully and pending" });
        }
        // console.log("hello i am in api",req.body)
        
      else{
        const Cart=new CartItem({
            user:user.id,
            product:product._id,
            quantity:quantity
        });
        await Cart.save();
         res.status(200).json({message:"ok cart data stores in db"})
        }
    }
    else{
        const pendingCartItems = await CartItem.find({ status: "Pending" })
        .populate('user') // Populates the 'user' field with the User document
        .populate('product');        

        res.status(200).json({cart:pendingCartItems, mess:"guddy"});
    }

}