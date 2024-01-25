import { TestBed } from '@angular/core/testing';
import { IdxDbService } from '../idx-db.service';

describe('IndexedDbService', () => {
  let service: IdxDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdxDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
