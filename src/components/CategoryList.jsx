import { Layers2, Pencil } from 'lucide-react'
import React from 'react'

const CategoryList = ({categories, onEditCategory}) => {
  return (
    <>
    <div className="bg-gray-900 shadow-2xl rounded-3xl p-6 border border-gray-800 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold text-gray-100">Category Sources</h4>
      </div>
         {/* Category list */}
         {
          categories.length===0 ? (
            <p className="text-gray-400 text-center py-8 font-medium">No categories added yet. Add some to get started!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category,index)=>(
                <div key={category.id} className="group relative flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-800/50 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-gray-700">
                  {/* Icon/emoji display */}
                  <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-300 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
                    {category.icon ? (
                      <span className='text-2xl'>
                         {category.icon.startsWith("http") ? (
                          <img src={category.icon} alt={category.name} className='h-5 w-5' />
                           ) : (
                          category.icon  // render emoji directly
                           )}
                      </span>
                    ): ( <Layers2 className='text-purple-400' size={24}/>)}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    {/* Category details */}
                    <div>
                      {/* category name and type */}
                      <p className="text-sm text-gray-200 font-semibold">{category.name}</p>
                      <p className="text-sm text-gray-500 mt-1 capitalize font-medium">{category.type}</p>
                    </div>
                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button 
                      onClick={()=>{onEditCategory(category)}}
                      className='text-gray-500 bg-gray-800 p-2 rounded-xl hover:text-white hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md'>
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          )
         }
      
    </div>
    </>
  )
}

export default CategoryList