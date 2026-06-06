import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookamrk } from './edit-bookamrk';

describe('EditBookamrk', () => {
  let component: EditBookamrk;
  let fixture: ComponentFixture<EditBookamrk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookamrk],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookamrk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
