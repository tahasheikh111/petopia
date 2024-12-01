import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import { PawPrintIcon as Paw, Edit, Trash2, Upload, X } from 'lucide-react'
import { Loader2 } from "lucide-react"

export default function AdminPanel() {
  const { data: session } = useSession()
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (session) {
      fetch("/api/products/user")
        .then((res) => res.json())
        .then(setProducts)

    }
    console.log(products)
  }, [session])

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setProducts(products.filter((product) => product._id !== id))
  }

  const handleUpdate = async (id, updatedData) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
    const updatedProduct = await res.json()
    setProducts(products.map((p) => (p._id === id ? updatedProduct : p)))
    setEditingProduct(null)
  }

  const handleImageUpload = async (file, productId) => {
    setIsUploading(true)
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file)

      if (uploadError) {
        console.error("Upload Error:", uploadError)
        alert("Image upload failed. Please try again.")
        return
      }

      const { data: publicData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(filePath)

      if (urlError) {
        console.error("URL Fetch Error:", urlError)
        alert("Failed to retrieve image URL.")
        return
      }

      const imageUrl = publicData.publicUrl
      await handleUpdate(productId, { imageUrl })
      alert("Image uploaded successfully!")
    } catch (err) {
      console.error("Unexpected Error:", err.message)
      alert("An unexpected error occurred. Check the console for details.")
    } finally {
      setIsUploading(false)
    }
  }

  if (!session) return <p className="text-center mt-8">Please log in to view this page.</p>

  return (
    <div className="mx-auto p-4 w-full h-full "style={{
        backgroundImage: "url('/paws.png')",
      }}>
      <h1 className="text-3xl font-bold mb-6 flex text-black items-center text-center">
        <Paw className="mr-2" />
        Pet Products Admin Panel
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="overflow-hidden">
            <CardHeader className="relative p-0">
              {product.imageUrll ? (
                <Image
                  src={product.imageUrll}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Paw className="text-gray-400" size={48} />
                </div>
              )}
              {editingProduct !== product._id && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setEditingProduct(product._id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-4">
              {editingProduct === product._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const updatedData = Object.fromEntries(formData)
                    handleUpdate(product._id, updatedData)
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor={`name-${product._id}`}>Name</Label>
                    <Input id={`name-${product._id}`} name="name" defaultValue={product.name} required />
                  </div>
                  <div>
                    <Label htmlFor={`price-${product._id}`}>Price</Label>
                    <Input id={`price-${product._id}`} name="price" defaultValue={product.price} required />
                  </div>
                  <div>
                    <Label htmlFor={`description-${product._id}`}>Description</Label>
                    <Textarea id={`description-${product._id}`} name="description" defaultValue={product.description} required />
                  </div>
                  <div className="flex justify-between">
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-green-600 font-bold mb-2">${product.price}</p>
                  <p className="text-gray-600">{product.description}</p>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => document.getElementById(`fileInput-${product._id}`).click()}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                {isUploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                id={`fileInput-${product._id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0], product._id)}
                className="hidden"
              />
              <Button variant="destructive" onClick={() => handleDelete(product._id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

