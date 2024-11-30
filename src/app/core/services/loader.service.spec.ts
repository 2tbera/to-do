import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loader state to true', () => {
    service.setLoaderState(true);
    expect(service.getLoaderState()).toBe(true);
  });

  it('should set loader state to false', () => {
    service.setLoaderState(false);
    expect(service.getLoaderState()).toBe(false);
  });

  it('should toggle loader state', () => {
    service.setLoaderState(true);
    expect(service.getLoaderState()).toBe(true);
    service.setLoaderState(false);
    expect(service.getLoaderState()).toBe(false);
  });
});