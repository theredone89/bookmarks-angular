import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bookmark-form-panel',
  imports: [MatFormField, MatIconModule, MatInputModule, MatExpansionModule, MatButtonModule],
  templateUrl: './bookmark-form-panel.html',
  styleUrl: './bookmark-form-panel.scss',
})
export class BookmarkFormPanel {
  @Input() panelTitle = '';
  @Input() panelDescription = '';
  @Input() icon = '';
  @Input() buttonText = '';
  @Input() title!: WritableSignal<string>;
  @Input() link!: WritableSignal<string>;
  @Output() submit = new EventEmitter<void>();
}
