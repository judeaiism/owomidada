"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { ImagePlus, Loader2, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import useProductStore from '@/stores/productStore';
import { useRouter } from 'next/navigation';

export default function CreateListing() {
  const [images, setImages] = useState<string[]>([])
  const [isPublishing, setIsPublishing] = useState(false)
  const addProduct = useProductStore((state) => state.addProduct);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: 'new',
    description: '',
    location: '',
    listingType: 'single'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (images.length >= 8) {
        alert("You can only upload up to 8 images.")
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages([...images, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handlePublish = () => {
    setIsPublishing(true)
    const newProduct = {
      name: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: images[0] || '',
      condition: formData.condition,
      location: formData.location,
      listingType: formData.listingType,
    };

    addProduct(newProduct);

    setIsPublishing(false);
    alert("Listing published successfully!");
    // Reset form
    setFormData({
      title: '',
      price: '',
      category: '',
      condition: 'new',
      description: '',
      location: '',
      listingType: 'single'
    });
    setImages([]);
    // Navigate back to the home page
    router.push('/');
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create a New Listing</h1>
      
      {/* Image Upload */}
      <div className="mb-6">
        <Label htmlFor="images">Images (up to 8)</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Uploaded ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              <Button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1 h-auto"
                size="sm"
                variant="destructive"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
          {images.length < 8 && (
            <label htmlFor="image-upload" className="w-24 h-24 border-2 border-dashed border-input rounded flex items-center justify-center cursor-pointer">
              <ImagePlus className="text-muted-foreground" />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter listing title" />
      </div>

      {/* Price */}
      <div className="mb-4">
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Enter price" />
      </div>

      {/* Category */}
      <div className="mb-4">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={handleSelectChange} value={formData.category}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="mb-4">
        <Label>Condition</Label>
        <RadioGroup value={formData.condition} onValueChange={(value) => handleRadioChange('condition', value)}>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="used-like-new" id="used-like-new" />
              <Label htmlFor="used-like-new">Used - Like New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="used-good" id="used-good" />
              <Label htmlFor="used-good">Used - Good</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="used-fair" id="used-fair" />
              <Label htmlFor="used-fair">Used - Fair</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="needs-repair" id="needs-repair" />
              <Label htmlFor="needs-repair">Needs Repair(s)</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your item" />
      </div>

      {/* Location */}
      <div className="mb-4">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter location" />
      </div>

      {/* Single item / Bulk */}
      <div className="mb-4">
        <Label>Listing Type</Label>
        <RadioGroup value={formData.listingType} onValueChange={(value) => handleRadioChange('listingType', value)}>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single Item</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bulk" id="bulk" />
              <Label htmlFor="bulk">Bulk</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Shipping */}
      <div className="mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Shipping Options</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Shipping Options</DialogTitle>
              <DialogDescription>
                Choose the shipping options you want to offer for this listing.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="offer-shipping" />
                <Label htmlFor="offer-shipping">Offer Shipping</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="public-meetup" />
                <Label htmlFor="public-meetup">Public Meet-up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="door-pickup" />
                <Label htmlFor="door-pickup">Door Pick-up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="door-dropoff" />
                <Label htmlFor="door-dropoff">Door Drop-off</Label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Publish Button */}
      <Button
        onClick={handlePublish}
        disabled={isPublishing}
        className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        {isPublishing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          'Publish Listing'
        )}
      </Button>
    </div>
  )
}