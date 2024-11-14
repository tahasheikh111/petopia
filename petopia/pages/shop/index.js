'use client'

import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

import SearchItem from '@/components/SearchItem'
import Categories from '@/components/Categories'
import ProductCard from '@/components/ProductCard'
export default function FeaturedProducts() {

  <SearchItem/>
  const [activeCategory, setActiveCategory] = useState('cat')
  const [quantities, setQuantities] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['cat', 'dog', 'fish', 'birds']

  const products = [
    {
      id: 1,
      name: 'Multivitamin For Cat',
      price: '₦15,000.00',
      description: 'Lorem ipsum dolor sit amet consectetur. Vitae donec pellentesque ut eget tempor egestas diam.',
      image: '/temp.svg',
    },
    {
      id: 2,
      name: 'Healthy Snacks For Dog',
      price: '₦10,000.00',
      description: 'Lorem ipsum dolor sit amet consectetur. Vitae donec pellentesque ut eget tempor egestas diam.',
      image: '/temp.svg',
    },
    // Add more products as needed
  ]

  const updateQuantity = (productId, increment) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 1) + (increment ? 1 : -1)),
    }))
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
            .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id]}
                updateQuantity={updateQuantity}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
