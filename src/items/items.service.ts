import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private items: Item[] = [
    { id: '1', name: 'Laptop', quantity: 5, description: 'Dell XPS 13' },
    { id: '2', name: 'Mouse', quantity: 20, description: 'Wireless mouse' },
    { id: '3', name: 'Keyboard', quantity: 10, description: 'Mechanical keyboard' },
    { id: '4', name: 'Monitor', quantity: 8, description: '27" 4K Monitor' },
    { id: '5', name: 'Headphones', quantity: 15, description: 'Sony WH-1000XM4' },
    { id: '6', name: 'Webcam', quantity: 12, description: 'Logitech C920 Pro' },
    { id: '7', name: 'Microphone', quantity: 7, description: 'Blue Yeti USB' },
    { id: '8', name: 'USB Hub', quantity: 25, description: '7-port USB 3.0' },
    { id: '9', name: 'HDMI Cable', quantity: 30, description: '2m HDMI 2.1 Cable' },
    { id: '10', name: 'Power Bank', quantity: 18, description: '20000mAh Power Bank' },
    { id: '11', name: 'Phone Stand', quantity: 22, description: 'Adjustable phone stand' },
    { id: '12', name: 'Desk Lamp', quantity: 9, description: 'LED desk lamp 5W' },
    { id: '13', name: 'Mousepad', quantity: 35, description: 'Gaming mousepad' },
    { id: '14', name: 'External SSD', quantity: 6, description: '1TB Samsung T7' },
    { id: '15', name: 'USB-C Cable', quantity: 40, description: '2m USB-C cable' },
    { id: '16', name: 'Screen Cleaner', quantity: 50, description: 'LCD screen cleaner' },
    { id: '17', name: 'Cable Organizer', quantity: 28, description: 'Desktop cable organizer' },
    { id: '18', name: 'Desk Pad', quantity: 11, description: 'Large desk pad mat' },
    { id: '19', name: 'Office Chair', quantity: 3, description: 'Ergonomic office chair' },
    { id: '20', name: 'Standing Desk', quantity: 2, description: 'Electric standing desk' },
    { id: '21', name: 'Monitor Stand', quantity: 14, description: 'Adjustable monitor stand' },
    { id: '22', name: 'Keyboard Wrist Rest', quantity: 16, description: 'Memory foam wrist rest' },
    { id: '23', name: 'Mouse Bungee', quantity: 19, description: 'Cable management mouse bungee' },
    { id: '24', name: 'Laptop Stand', quantity: 13, description: 'Aluminum laptop stand' },
    { id: '25', name: 'Ethernet Cable', quantity: 45, description: 'Cat 6 ethernet cable' },
  ];
  private idCounter = 26;

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
