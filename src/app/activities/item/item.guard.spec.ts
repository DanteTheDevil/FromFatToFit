import { TestBed, async, inject } from '@angular/core/testing';

import { ItemGuard } from './item.guard';

describe('ItemGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemGuard]
    });
  });

  it('should ...', inject([ItemGuard], (guard: ItemGuard) => {
    expect(guard).toBeTruthy();
  }));
});
