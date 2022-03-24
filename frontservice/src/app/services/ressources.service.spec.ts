/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RessourcesService } from './ressources.service';

describe('Service: Ressources', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RessourcesService]
    });
  });

  it('should ...', inject([RessourcesService], (service: RessourcesService) => {
    expect(service).toBeTruthy();
  }));
});
