import { Component, Input, inject } from '@angular/core';
import { IBookmark } from '../../models/bookmark.model';
import { Store } from '@ngrx/store';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { TruncateUrlPipe } from '../../../../shared/pipes/truncate-url-pipe';
import { BookmarkApi } from '../../services/bookmark-api.service';
import { BookmarkActions } from '../../state/bookmark.action';

@Component({
  selector: 'app-bookmark-item',
  imports: [MatIcon, MatIconButton, MatSnackBarModule, RouterLink, TruncateUrlPipe],
  templateUrl: './bookmark-item.html',
  styleUrl: './bookmark-item.scss',
})
export class BookmarkItem {
  @Input() bookmark!: IBookmark;

  private readonly store = inject(Store);
  private readonly bookmarksService = inject(BookmarkApi);
  private readonly snackBar = inject(MatSnackBar);

  delete(id: string): void {
    this.bookmarksService.deleteBookmark(id).subscribe({
      next: () => {
        this.store.dispatch(BookmarkActions.removeBookmark({ id }));
      },
      error: () => {
        this.snackBar.open('Failed to delete bookmark. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
