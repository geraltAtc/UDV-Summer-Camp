import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo.service';
import { Item } from '../item';

@Component({
  selector: 'app-deleted-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deleted-items.component.html',
  styleUrls: ['./deleted-items.component.css'],
})
export class DeletedItemsComponent {
  constructor(public todoService: TodoService) {}

  // Метод для восстановления заметки
  restoreItem(item: Item) {
    this.todoService.restoreItem(item);
  }

  // Метод для безвозвратного удаления заметки
  permanentlyDeleteItem(item: Item) {
    this.todoService.permanentlyDeleteItem(item);
  }

  // Метод для очистки всех удалённых заметок
  clearAllItems() {
    this.todoService.clearDeletedItems();
  }
}