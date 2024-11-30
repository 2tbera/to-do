import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService, AlertModel, AlertTypesENUM, LoaderService } from '../';

/**
 * @description
 * ApiService provides methods to interact with the backend API.
 * It includes methods for HTTP GET, POST, PUT, DELETE, and file upload operations.
 * The service handles error formatting and displays alerts using AlertService.
 * It also manages loader state using LoaderService.
 */

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http: HttpClient = inject(HttpClient);

  private alertService: AlertService = inject(AlertService);

  private loaderService: LoaderService = inject(LoaderService);

  environment = 'http://localhost:9000/';

  formatErrors = (error: any): Observable<never> => {
    this.alertService.statusHandler(new AlertModel(AlertTypesENUM.Danger, 1000, error.message));
    this.loaderService.setLoaderState(false)
    return throwError(error);
  }

  private createHttpParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return httpParams;
  }

  private createOptions(params?: any, body?: any): { headers: HttpHeaders; body?: any; params: HttpParams } {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body,
      params: this.createHttpParams(params)
    };
  }

  public delete<T = any>(path: string, params?: any, api: string = 'apiUrl'): Observable<any> {
    const options = this.createOptions(params, params);
    return this.http.delete<any>(`${this.environment}${path}`, options).pipe(catchError(this.formatErrors));
  }

  public get<T = any>(path: string, params?: any, api: string = 'apiUrl', responseType?: any): Observable<any> {
    const httpParams = this.createHttpParams(params);
    return this.http.get<T>(`${this.environment}${path}`, { params: httpParams, responseType }).pipe(catchError(this.formatErrors));
  }

  public post<T = any>(path: string, body: any, params?: any, api: string = 'apiUrl'): Observable<any> {
    const options = this.createOptions(params);
    return this.http.post<T>(`${this.environment}${path}`, JSON.stringify(body), options).pipe(catchError(this.formatErrors));
  }

  public put<T = any>(path: string, body: object = {}, params?: any, api: string = 'apiUrl'): Observable<any> {
    const options = this.createOptions(params);
    return this.http.put<T>(`${this.environment}${path}`, JSON.stringify(body), options).pipe(catchError(this.formatErrors));
  }

  public upload<T = any>(path: string, body: any, params?: any, api: string = 'apiUrl'): Observable<any> {
    const httpParams = this.createHttpParams(params);
    return this.http.post(`${this.environment}${path}`, body, { params: httpParams }).pipe(catchError(this.formatErrors));
  }
}
