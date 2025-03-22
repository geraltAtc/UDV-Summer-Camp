import { Component, signal, computed } from '@angular/core';
import { Item } from './item';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
	standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo';
  filter = signal<'all' | 'active' | 'done'>('all');
  allItems = signal<Item[]>([]);
  deletedItems = signal<Item[]>([]);

  items = computed(() => {
    const filter = this.filter();
    const items = this.allItems();
    if (filter === 'all') return items;
    return items.filter((item) => (filter === 'done' ? item.done : !item.done));
  });

  addItem(description: string) {
    if (!description) return;
    this.allItems.update((items) => [
      { description, done: false },
      ...items,
    ]);
  }

  remove(item: Item) {
    this.allItems.update((items) => items.filter((i) => i !== item));
    this.deletedItems.update((items) => [item, ...items]);
  }

  restoreItem(item: Item) {
    this.deletedItems.update((items) => items.filter((i) => i !== item));
    this.allItems.update((items) => [item, ...items]);
  }

  permanentlyDeleteItem(item: Item) {
    this.deletedItems.update((items) => items.filter((i) => i !== item));
  }

  clearDeletedItems() {
    this.deletedItems.set([]);
  }
}