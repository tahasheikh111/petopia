'use client'

import { useEffect, useState } from 'react'
import SearchItem from '@/components/SearchItem'
import Categories from '@/components/Categories'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/router'
import { PlusCircle, Sparkles } from 'lucide-react'

export default function FeaturedProducts(props) {
  const [activeCategory, setActiveCategory] = useState('cat')
  const [quantities, setQuantities] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  
  const categories = ['all products', 'cat', 'dog', 'fish', 'birds']
  const r = useRouter()
  const products = props.products

  useEffect(() => {
    // Initialize quantities
    const initialQuantities = {}
    products.forEach((product) => {
      initialQuantities[product._id] = 1 // Default quantity
    })
    setQuantities(initialQuantities)
  }, [products])

  const updateQuantity = (productId, increment) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 1) + (increment ? 1 : -1)),
    }))
  }

  const btnhandler2 = (e) => {
    e.preventDefault()
    r.push('/addProduct')
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#000000] text-3xl font-bold">Featured Products</h1>
          <SearchItem searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products
            .filter(
              (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (activeCategory === 'all products' || product.category === activeCategory)
            )
            .map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                quantity={quantities[product._id]}
                updateQuantity={updateQuantity}
              />
            ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={btnhandler2}
            className="group relative overflow-hidden bg-[#243961] hover:bg-[#1a2d4a] text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#243961] focus:ring-opacity-50"
            aria-label="Add new product"
          >
            <span className="relative z-10 flex items-center">
              <PlusCircle className="w-5 h-5 mr-2" />
              Want to add product??
              <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
            </span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-0"></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/addproduct')
  const data = await response.json()

  return {
    props: {
      products: data.prod,
    },
  }
}
