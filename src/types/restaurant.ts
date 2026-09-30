export interface MenuItem {
  id: string;
  name: string;
  category: 'shawarma' | 'loaded_fries' | 'wings' | 'pizza' | 'salad';
  price: number; // in GHS
  description: string;
  image?: string;
  signature?: boolean;
  popular?: boolean;
  spiceCustomizable?: boolean;
  portion: string;
  ingredients: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  menuItem: MenuItem;
  quantity: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Extra Hot (Ghana Pepper)';
  selectedAddons: string[];
  specialInstructions?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  rating: number;
  dishOrdered: string;
  review: string;
  date: string;
  verified: boolean;
}

