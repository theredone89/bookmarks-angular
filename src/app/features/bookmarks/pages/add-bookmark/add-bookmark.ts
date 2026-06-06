import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormField } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookmarkActions } from '../../state/bookmark.action';
import { BookmarkApi } from '../../services/bookmark-api.service';
import { IBookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-add-bookmark',
  imports: [MatFormField, MatIconModule, MatInputModule, MatExpansionModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './add-bookmark.html',
  styleUrl: './add-bookmark.scss',
})
export class AddBookmark {
  private readonly store = inject(Store);
  private readonly bookmarksService = inject(BookmarkApi);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  protected title = signal('');
  protected link = signal('');

  protected onAddBookmark(): void {
    const title = this.title().trim();
    const link = this.link().trim();

    if (!title || !link) {
      return;
    }

    const newBookmark: IBookmark = {
      id: '',
      title,
      link,
      date: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
    };

    this.bookmarksService.addBookmark(newBookmark).subscribe({
      next: (createdBookmark) => {
        this.store.dispatch(BookmarkActions.addBookmark({ bookmark: createdBookmark }));
        this.title.set('');
        this.link.set('');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Failed to add bookmark', error);
        this.snackBar.open('Failed to add bookmark. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
