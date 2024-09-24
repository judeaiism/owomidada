// components/ProductCard.tsx
import { Card, CardHeader, CardBody, CardFooter } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';

export default function ProductCard({ product }) {
  return (
    <Card className="w-full md:w-1/3 lg:w-1/4 p-2">
      <CardHeader>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      </CardHeader>
      <CardBody>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-md font-bold">${product.price}</p>
      </CardBody>
      <CardFooter>
        <Button variant="primary">View Details</Button>
      </CardFooter>
    </Card>
  );
}