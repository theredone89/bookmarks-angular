import { Component, computed, effect, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookmarkApi } from '../../services/bookmark-api.service';
import { BookmarkActions } from '../../state/bookmark.action';
import { selectBookmarks } from '../../state/bookmark.selector';
import { IBookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-edit-bookamrk',
  imports: [NgIf, MatFormField, MatIconModule, MatInputModule, MatExpansionModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './edit-bookamrk.html',
  styleUrl: './edit-bookamrk.scss',
})
export class EditBookamrk {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly bookmarksService = inject(BookmarkApi);
  private readonly snackBar = inject(MatSnackBar);

  protected title = signal('');
  protected link = signal('');
  private currentBookmarkId = '';

  protected bookmarks = this.store.selectSignal(selectBookmarks);

  protected selectedBookmark = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.bookmarks().find((bookmark) => bookmark.id === id);
  });

  private readonly bookmarkWatcher = effect(() => {
    const bookmark = this.selectedBookmark();
    if (bookmark && bookmark.id !== this.currentBookmarkId) {
      this.currentBookmarkId = bookmark.id;
      this.title.set(bookmark.title);
      this.link.set(bookmark.link);
    }
  });

  protected onSave(): void {
    const bookmark = this.selectedBookmark();
    if (!bookmark) {
      this.snackBar.open('Unable to save bookmark. Bookmark not found.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    const updatedBookmark: IBookmark = {
      ...bookmark,
      title: this.title().trim(),
      link: this.link().trim(),
      lastModifiedDate: new Date().toISOString(),
    };

    if (!updatedBookmark.title || !updatedBookmark.link) {
      this.snackBar.open('Title and link are required.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    this.bookmarksService.updateBookmark(updatedBookmark).subscribe({
      next: (bookmark) => {
        this.store.dispatch(BookmarkActions.editBookmark({ bookmark }));
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Failed to save bookmark', error);
        this.snackBar.open('Failed to save bookmark. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
