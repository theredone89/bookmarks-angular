import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBookmark } from '../models/bookmark.model';
import { BookmarkState } from './bookmark.reducer';

const selectBookmarkState = createFeatureSelector<BookmarkState>('bookmarks');

const selectSavedBookmarks = createSelector(
  selectBookmarkState,
  (state) => [...state.bookmarks].sort((a, b) => b.date.localeCompare(a.date))
);

const selectSearchQuery = createSelector(
  selectBookmarkState,
  (state) => state.query.trim().toLowerCase()
);

export const selectQuery = createSelector(
  selectBookmarkState,
  (state) => state.query
);

const matchesQuery = (bookmark: IBookmark, query: string): boolean => {
  if (!query) {
    return true;
  }

  const haystack = `${bookmark.title} ${bookmark.link}`.toLowerCase();
  return query
    .split(/\s+/)
    .filter((term) => term.length > 0)
    .every((term) => haystack.includes(term));
};

export const selectBookmarks = createSelector(
  selectSavedBookmarks,
  selectSearchQuery,
  (bookmarks, query) => bookmarks.filter((bookmark) => matchesQuery(bookmark, query))
);
