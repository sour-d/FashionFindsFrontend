import { PackageX } from "lucide-react"

export function NoProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <PackageX className="h-16 w-16 text-gray-400" />
      <h2 className="mt-4 text-xl font-semibold text-gray-900">No Products Found</h2>
      <p className="mt-2 text-center text-gray-500">
        We couldn't find any products at the moment. Please try again later.
      </p>
    </div>
  )
}
