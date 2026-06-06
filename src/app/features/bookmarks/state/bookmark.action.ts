import { createActionGroup, props } from '@ngrx/store';
import { IBookmark } from '../models/bookmark.model';

export const BookmarkActions = createActionGroup({
  source: 'Booksmarks',
  events: {
    'Add Bookmark': props<{ bookmark: IBookmark }>(),
    'Edit Bookmark': props<{ bookmark: IBookmark }>(),
    'Remove Bookmark': props<{ id: string }>(),
    'Search Bookmarks': props<{ query: string }>(),
  },
});

export const BookmarkApiActions = createActionGroup({
  source: 'Booksmarks API',
  events: {
    'Retrieved Bookmark List': props<{ bookmarks: ReadonlyArray<IBookmark> }>(),
  },
});