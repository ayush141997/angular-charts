import { TestBed } from '@angular/core/testing';

import { Screen1Service } from './screen1.service';

describe('Screen1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Screen1Service = TestBed.get(Screen1Service);
    expect(service).toBeTruthy();
  });
});
