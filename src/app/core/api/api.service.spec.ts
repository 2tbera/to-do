import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { AlertService, LoaderService } from '../';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let alertService: jasmine.SpyObj<AlertService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const alertSpy = jasmine.createSpyObj('AlertService', ['statusHandler']);
    const loaderSpy = jasmine.createSpyObj('LoaderService', ['setLoaderState']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: AlertService, useValue: alertSpy },
        { provide: LoaderService, useValue: loaderSpy }
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method', () => {
    const dummyData = { data: 'test' };
    service.get('test').subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:9000/test');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should call post method', () => {
    const dummyData = { data: 'test' };
    service.post('test', dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:9000/test');
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  });

  it('should call put method', () => {
    const dummyData = { data: 'test' };
    service.put('test', dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:9000/test');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyData);
  });

  it('should call delete method', () => {
    service.delete('test').subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:9000/test');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});