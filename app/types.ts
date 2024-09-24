export interface Product {
    id: string; // Change this from 'string | number' to just 'string'
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
}