import { Routes } from '@angular/router';
import { Home, EditBookamrk, AddBookmark, SearchResults } from './features/bookmarks/pages';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page'
  },
  {
    path: 'edit/:id',
    component: EditBookamrk,
    title: 'Edit Bookmark'
  },
  {
    path: 'add',
    component: AddBookmark,
    title: 'Add Bookmark'
  }
  ,
  {
    path: 'search',
    component: SearchResults,
    title: 'Search Results'
  }
];
