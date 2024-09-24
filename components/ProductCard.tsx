// components/ProductCard.tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full md:w-1/3 lg:w-1/4 p-2">
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={160}
          className="w-full h-40 object-cover"
        />
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-md font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button variant="default">View Details</Button>
      </CardFooter>
    </Card>
  );
}