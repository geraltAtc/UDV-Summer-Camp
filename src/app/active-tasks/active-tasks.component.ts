import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoService } from '../todo.service';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-active-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, ItemComponent, FormsModule],
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.css'],
})
export class ActiveTasksComponent {
	showInput = false; // Состояние для отображения поля ввода
  newItemDescription = ''; // Текст новой заметки
  constructor(public todoService: TodoService) {}

  // Метод для удаления задачи
  removeItem(item: Item) {
    this.todoService.remove(item);
  }

	// Метод для добавления новой заметки
  addItem() {
    if (this.newItemDescription.trim()) {
      this.todoService.addItem(this.newItemDescription);
      this.newItemDescription = '';
      this.showInput = false;
    }
  }

  // Метод для отмены создания заметки
  cancelAdd() {
    this.showInput = false;
    this.newItemDescription = '';
  }
}