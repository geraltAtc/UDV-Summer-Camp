import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../item';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  editable = false; // Режим редактирования
  editText = ''; // Текст для редактирования

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();

  constructor(private todoService: TodoService) {}

  // Метод для переключения в режим редактирования
  startEdit() {
    this.editable = true;
    this.editText = this.item.description; // Копируем текст заметки в поле редактирования
  }

  // Метод для завершения редактирования
  saveEdit() {
    if (this.editText.trim()) {
      this.item.description = this.editText; // Обновляем текст заметки
      this.todoService.updateItemDescription(this.item, this.editText);
      this.editable = false;
    }
  }

  // Метод для отмены редактирования
  cancelEdit() {
    this.editable = false;
  }
}