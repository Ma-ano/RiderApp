// src/types/index.ts
export interface Stall {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  cuisine: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  stallId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  token?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered';
  createdAt: Date;
  stallName: string;
}