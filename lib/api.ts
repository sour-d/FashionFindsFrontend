export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
}

export async function getProducts(): Promise<Product[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      throw new Error("Backend URL is not defined")
    }

    const query = `
      query {
        products {
          id
          name
          description
          price
          stock
        }
      }
    `

    const response = await fetch(`${backendUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const data = await response.json()
    return data.data.products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      throw new Error("Backend URL is not defined")
    }

    const query = `
      query {
        product(id: "${id}") {
          id
          name
          description
          price
          stock
        }
      }
    `

    const response = await fetch(`${backendUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }

    const data = await response.json()
    return data.data.product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}
