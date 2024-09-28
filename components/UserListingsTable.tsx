import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from '@/stores/productStore';

interface UserListingsTableProps {
  listings: Product[];
}

const UserListingsTable: React.FC<UserListingsTableProps> = ({ listings }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell>{listing.name}</TableCell>
            <TableCell>{listing.category}</TableCell>
            <TableCell>${listing.price.toFixed(2)}</TableCell>
            <TableCell>{listing.condition}</TableCell>
            <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserListingsTable;