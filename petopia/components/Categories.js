
const Categories = ({ categories, activeCategory, setActiveCategory }) => (
    <div className="mt-6 mb-12 flex justify-center space-x-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`w-[126px] h-[50px] rounded-md capitalize ${
            activeCategory === category
              ? 'bg-[#243961] text-white'
              : 'bg-white text-[#000000] border border-[#000000]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
  export default Categories