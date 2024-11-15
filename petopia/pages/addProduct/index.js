import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useRef } from 'react'

const AddProduct = () => {
  const [category, setCategory] = useState("")
  const ref_name = useRef(null)
  const ref_price = useRef(null)
  const ref_description = useRef(null)

  const btnhandler = (e) => {
    e.preventDefault()

    
    const input_name = ref_name.current.value
    const input_price = ref_price.current.value
    const input_description = ref_description.current.value
    const input_category = category

    if (input_name && input_price && input_description && input_category) {
      fetch('/api/addproduct', {
        method: 'POST',
        body: JSON.stringify({
          prod_name: input_name,
          prod_price: input_price,
          prod_description: input_description,
          prod_category: input_category,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data11, data.message)
          alert("Data saved successfully")
        })
        .catch((error) => {
          console.error("Error:", error)
          alert("Error saving product")
        })
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={btnhandler} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" ref={ref_name} placeholder="Enter product name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Product Price</Label>
              <Input id="price" ref={ref_price} placeholder="Enter product price" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea id="description" ref={ref_description} placeholder="Enter product description" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Product Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="fish">Fish</SelectItem>
                  <SelectItem value="birds">Birds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct
