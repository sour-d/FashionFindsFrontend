"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({ categories, onSelectCategory }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      onSelectCategory(null)
    } else {
      setSelectedCategory(category)
      onSelectCategory(category)
    }
  }

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium text-gray-900">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selectedCategory === category ? "bg-primary text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200",
            )}
          >
            {category}
          </button>
        ))}
        {selectedCategory && (
          <button
            onClick={() => {
              setSelectedCategory(null)
              onSelectCategory(null)
            }}
            className="rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
