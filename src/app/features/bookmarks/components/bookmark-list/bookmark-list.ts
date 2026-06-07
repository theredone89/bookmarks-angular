import { Component, Input } from '@angular/core';
import { BookmarkItem } from '../bookmark-item/bookmark-item';
import { IBookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-bookmar-list',
  standalone: true,
  imports: [BookmarkItem],
  templateUrl: './bookmark-list.html',
  styleUrls: ['./bookmark-list.scss'],
})
export class BookmarkList {
  @Input() bookmarks: ReadonlyArray<IBookmark> = [];

  private getDateKey(dateValue: string): string {
    const date = new Date(dateValue);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private getStartOfDay(dateValue: string): number {
    const date = new Date(dateValue);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  private groupBookmarksByDate(): Record<string, ReadonlyArray<IBookmark>> {
    return this.bookmarks.reduce((groups, bookmark) => {
      const key = this.getDateKey(bookmark.date);
      const list = groups[key] ? [...groups[key], bookmark] : [bookmark];
      groups[key] = list;
      return groups;
    }, {} as Record<string, ReadonlyArray<IBookmark>>);
  }

  protected get groupedBookmarks(): Record<string, ReadonlyArray<IBookmark>> {
    return this.groupBookmarksByDate();
  }

  protected get todayBookmarks(): ReadonlyArray<IBookmark> {
    return this.groupedBookmarks[this.getDateKey(new Date().toISOString())] ?? [];
  }

  protected get yesterdayBookmarks(): ReadonlyArray<IBookmark> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.groupedBookmarks[this.getDateKey(yesterday.toISOString())] ?? [];
  }

  protected get olderBookmarks(): ReadonlyArray<IBookmark> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    return this.bookmarks.filter((bookmark) => {
      const bookmarkDay = this.getStartOfDay(bookmark.date);
      return bookmarkDay < yesterday.getTime();
    });
  }
}
