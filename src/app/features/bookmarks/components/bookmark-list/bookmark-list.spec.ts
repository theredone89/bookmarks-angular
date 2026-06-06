import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkList } from './bookmark-list';

describe('Home', () => {
  let component: BookmarkList;
  let fixture: ComponentFixture<BookmarkList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkList],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
