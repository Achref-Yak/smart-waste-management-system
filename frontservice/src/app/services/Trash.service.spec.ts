/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrashService } from './Trash.service';

describe('Service: Trash', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrashService]
    });
  });

  it('should ...', inject([TrashService], (service: TrashService) => {
    expect(service).toBeTruthy();
  }));
});
