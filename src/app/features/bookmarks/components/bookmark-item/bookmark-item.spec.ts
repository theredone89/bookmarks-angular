import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkItem } from './bookmark-item';

describe('BookmarkItem', () => {
  let component: BookmarkItem;
  let fixture: ComponentFixture<BookmarkItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
