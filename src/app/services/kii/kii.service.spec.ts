/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KiiService } from './kii.service';

describe('KiiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KiiService]
    });
  });

  it('should ...', inject([KiiService], (service: KiiService) => {
    expect(service).toBeTruthy();
  }));
});
