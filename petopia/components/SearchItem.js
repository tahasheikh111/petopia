import { Search, Heart, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Search as SearchIcon } from 'lucide-react';

const SearchItem = (props) => {
    const { searchQuery, setSearchQuery } = props
  
    return (
      <div className="relative">
        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[281px] h-[50px] rounded-[50px] bg-[#101828] text-white placeholder-gray-400 pl-12 pr-4 focus:outline-none"
        />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    )
  }
  export default SearchItem