import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  @Output() search = new EventEmitter<string>();

  protected query = '';

  protected onSearch(): void {
    this.search.emit(this.query.trim());
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query = target.value;

    if (!this.query.trim()) {
      this.search.emit('');
    }
  }
}
