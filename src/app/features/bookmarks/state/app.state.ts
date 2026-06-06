import { IBookmark } from "../models/bookmark.model";

export interface AppState {
  bookmarks: ReadonlyArray<IBookmark>;
}
