import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State for upload status
  const ref_name = useRef(null);
  const ref_price = useRef(null);
  const ref_description = useRef(null);

  // Function to handle image upload
  const handleImageUpload = async (file) => {
    setIsUploading(true); // Start loading state
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images") // Replace with your bucket name
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        alert("Image upload failed. Please try again.");
        return;
      }

      const { data: publicData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("URL Fetch Error:", urlError);
        alert("Failed to retrieve image URL.");
        return;
      }

      setImageUrl(publicData.publicUrl); // Set image URL in state
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Unexpected Error:", err.message);
      alert("An unexpected error occurred. Check the console for details.");
    } finally {
      setIsUploading(false); // End loading state
    }
  };

  // File input change handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleImageUpload(selectedFile); // Pass file for upload
    }
  };

  // Form submit handler
  const btnhandler = async (e) => {
    e.preventDefault();
    const input_name = ref_name.current.value;
    const input_price = ref_price.current.value;
    const input_description = ref_description.current.value;
    console.log(imageUrl,"hellllllo")

    if (input_name && input_price && input_description && category && imageUrl) {
      try {
        const response = await fetch("/api/addproduct", {
          method: "POST",
          body: JSON.stringify({
            prod_name: input_name,
            prod_price: input_price,
            prod_description: input_description,
            prod_category: category,
            prod_image: imageUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          alert("Product added successfully!");
        } else {
          console.error("Error adding product:", data);
          alert("Failed to add product.");
        }
      } catch (error) {
        console.error("Unexpected Error:", error);
        alert("An unexpected error occurred.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

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
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} required />
              {isUploading && <p className="text-yellow-500">Uploading image...</p>}
              {imageUrl && (
                <p>
                  Image uploaded:{" "}
                  <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View Image
                  </a>
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isUploading}>
              <Plus className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
