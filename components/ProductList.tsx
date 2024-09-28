import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ShoppingCart, Eye, MessageCircle, Bell, DollarSign, Heart, UserPlus, User, Facebook } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  condition: string
  location: string
  listingType: string
}

interface ProductCardProps {
  product: Product
}

function ViewDetailsModal({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" onClick={() => setIsOpen(true)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            {product.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>{product.description}</p>
          <Button variant="outline" className="justify-start">
            <MessageCircle className="mr-2 h-4 w-4" />
            Message seller
          </Button>
          <Button variant="outline" className="justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Set alert for listing
          </Button>
          <Button variant="outline" className="justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            Send offer
          </Button>
          <Button variant="outline" className="justify-start">
            <Heart className="mr-2 h-4 w-4" />
            Save product
          </Button>
          <Button variant="outline" className="justify-start">
            <UserPlus className="mr-2 h-4 w-4" />
            Follow seller
          </Button>
          <Button variant="outline" className="justify-start">
            <User className="mr-2 h-4 w-4" />
            See seller details
          </Button>
          <Button className="justify-start bg-blue-600 hover:bg-blue-700 text-white">
            <Facebook className="mr-2 h-4 w-4" />
            Facebook Marketplace Listing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full flex flex-col">
      <CardContent className="flex-grow p-4">
        {product.image && (
          <div className="w-full h-48 relative mb-2">
            {product.image.startsWith('data:') ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image 
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        )}
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <ViewDetailsModal product={product} />
      </CardFooter>
    </Card>
  )
}

interface ProductListProps {
  products: Product[];
  userData?: any;  // Add this line
}

const ProductList: React.FC<ProductListProps> = ({ products, userData }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      {userData && userData.sellerSettings && (
        <div>
          <h3>Listings from {userData.sellerSettings.storeName}</h3>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              {selectedProduct?.description}
            </DialogDescription>
          </DialogHeader>
          {/* Rest of the product details */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductList