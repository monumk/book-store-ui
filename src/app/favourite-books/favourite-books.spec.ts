import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteBooks } from './favourite-books';

describe('FavouriteBooks', () => {
  let component: FavouriteBooks;
  let fixture: ComponentFixture<FavouriteBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
