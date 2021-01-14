// src/items/item.interface.ts

export interface BaseItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Item extends BaseItem {
  id: number;
}