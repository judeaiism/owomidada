import React from 'react'

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList