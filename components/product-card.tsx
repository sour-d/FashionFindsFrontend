import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/api"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden">
          <div
            className={cn(
              "absolute right-2 top-2 z-10 rounded-full px-2 py-1 text-xs font-medium",
              isInStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
            )}
          >
            {isInStock ? `In Stock (${product.stock})` : "Out of Stock"}
          </div>
          <Image
            src={`/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
          <p className="mt-2 text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description || "No description available"}</p>
        </div>
      </div>
    </Link>
  )
}
