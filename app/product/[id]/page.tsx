"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { type Product, getProduct } from "@/lib/api"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const data = await getProduct(params.id)
        setProduct(data)
        if (!data) {
          setError("Product not found")
        }
      } catch (err) {
        setError("Failed to fetch product")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Product Not Found</h2>
          <p className="mt-2 text-center text-gray-500">We couldn't find the product you're looking for.</p>
        </div>
      </div>
    )
  }

  const isInStock = product.stock > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={`/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

          <div className="mt-4">
            <div
              className={cn(
                "inline-block rounded-full px-3 py-1 text-sm font-medium",
                isInStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
              )}
            >
              {isInStock ? `In Stock (${product.stock})` : "Out of Stock"}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description || "No description available for this product."}</p>
          </div>

          <div className="mt-auto pt-6">
            <Button className="w-full" size="lg" disabled={!isInStock}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            {!isInStock && <p className="mt-2 text-center text-sm text-red-600">This item is currently out of stock</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
