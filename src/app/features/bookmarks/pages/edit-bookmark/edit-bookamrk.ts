import { Component, computed, effect, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkApi } from '../../services/bookmark-api.service';
import { BookmarkActions, BookmarkApiActions } from '../../state/bookmark.action';
import { selectBookmarks } from '../../state/bookmark.selector';
import { IBookmark } from '../../models/bookmark.model';
import { BookmarkFormPanel } from '../../components/bookmark-form-panel/bookmark-form-panel';

@Component({
  selector: 'app-edit-bookamrk',
  imports: [BookmarkFormPanel],
  templateUrl: './edit-bookamrk.html',
  styleUrl: './edit-bookamrk.scss',
})
export class EditBookamrk implements OnInit {
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

  ngOnInit(): void {
    this.bookmarksService.getBookmarks().subscribe((bookmarks) =>
      this.store.dispatch(BookmarkApiActions.retrievedBookmarkList({ bookmarks }))
    );
  }

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
        this.snackBar.open('Failed to save bookmark. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
