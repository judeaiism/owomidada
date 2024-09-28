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
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserListingsTableProps {
  listings: Product[];
  onHide: (productId: string) => Promise<void>;
  onUnhide: (productId: string) => Promise<void>;
  onDelete: (productId: string) => Promise<void>;
}

const UserListingsTable: React.FC<UserListingsTableProps> = ({ listings, onHide, onUnhide, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
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
            <TableCell>{listing.hidden ? 'Hidden' : 'Visible'}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => listing.hidden ? onUnhide(listing.id) : onHide(listing.id)}>
                    {listing.hidden ? 'Unhide' : 'Hide'} Listing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(listing.id)} className="text-red-600">
                    Delete Listing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserListingsTable;