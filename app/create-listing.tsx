import React, { useState } from 'react';
import { useProductStore } from '../stores/productStore';
import { Product } from './types';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    image: '',
    description: '',
  });

  const addProduct = useProductStore((state) => state.addProduct);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
    };

    addProduct(newProduct);

    setFormData({
      name: '',
      price: 0,
      category: '',
      image: '',
      description: '',
    });

    // TODO: Implement redirect or success message
  };

  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Create New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        {/* Price Input */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />
        </div>
        {/* Category Input */}
        <div>
          <label className="block mb-1">Category</label>
          <select
            className="w-full p-2 border rounded-md"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {/* Add your categories here */}
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        {/* Image Input */}
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
          />
        </div>
        {/* Description Input */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default CreateListingPage;