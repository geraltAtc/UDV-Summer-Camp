import { Injectable, signal, computed } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  filter = signal<'all' | 'active' | 'done'>('all');
  allItems = signal<Item[]>(this.loadItems('items')); // Загружаем активные заметки
  deletedItems = signal<Item[]>(this.loadItems('deletedItems')); // Загружаем удалённые заметки

  items = computed(() => {
    const filter = this.filter();
    const items = this.allItems();
    if (filter === 'all') return items;
    return items.filter((item) => (filter === 'done' ? item.done : !item.done));
  });

  // Метод для загрузки данных из localStorage
  private loadItems(key: string): Item[] {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  }

  // Метод для сохранения данных в localStorage
  private saveItems(key: string, items: Item[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  // Метод для добавления новой заметки
  addItem(description: string) {
    if (!description) return;
    const newItem = { description, done: false };
    this.allItems.update((items) => {
      const updatedItems = [...items, newItem];
      this.saveItems('items', updatedItems);
      return updatedItems;
    });
  }

	// Метод для обновления описания задачи
updateItemDescription(item: Item, description: string) {
  this.allItems.update((items) => {
    const updatedItems = items.map((i) => (i === item ? { ...i, description } : i));
    this.saveItems('items', updatedItems);
    return updatedItems;
  });
}

  // Метод для удаления задачи
  remove(item: Item) {
    this.allItems.update((items) => {
      const updatedItems = items.filter((i) => i !== item);
      this.saveItems('items', updatedItems);
      return updatedItems;
    });
    this.deletedItems.update((items) => {
      const updatedDeletedItems = [item, ...items];
      this.saveItems('deletedItems', updatedDeletedItems);
      return updatedDeletedItems;
    });
  }

  // Метод для восстановления задачи
	restoreItem(item: Item) {
		this.deletedItems.update((items) => {
			const updatedDeletedItems = items.filter((i) => i !== item);
			this.saveItems('deletedItems', updatedDeletedItems);
			return updatedDeletedItems;
		});
		this.allItems.update((items) => {
			const updatedItems = [item, ...items];
			this.saveItems('items', updatedItems);
			return updatedItems;
		});
	}

  // Метод для полного удаления задачи
  permanentlyDeleteItem(item: Item) {
    this.deletedItems.update((items) => {
      const updatedDeletedItems = items.filter((i) => i !== item);
      this.saveItems('deletedItems', updatedDeletedItems);
      return updatedDeletedItems;
    });
  }

  // Метод для очистки всех удаленных задач
  clearDeletedItems() {
    this.deletedItems.set([]);
    this.saveItems('deletedItems', []);
  }
}