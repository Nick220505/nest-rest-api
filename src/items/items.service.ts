import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  async findAll(): Promise<Item[]> {
    return this.items;
  }

  async findOne(id: string): Promise<Item | null> {
    return this.items.find(item => item.id === id) || null;
  }

  async create(item: Item): Promise<Item> {
    const newItem: Item = {
      ...item,
      id: String(this.idCounter++),
    };
    this.items.push(newItem);
    return newItem;
  }

  async update(id: string, item: Item): Promise<Item | null> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return null;
    const updatedItem = { ...item, id };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  async delete(id: string): Promise<Item | null> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return null;
    const deletedItem = this.items[index];
    this.items.splice(index, 1);
    return deletedItem;
  }
}
