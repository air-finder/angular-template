import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { BaseResponse } from './models/base-response';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  private url = '';
  private http: HttpClient = inject(HttpClient);
  constructor(url: string, controller: string) {
    this.url = `${url}/api/${controller}`;
  }

  protected async ExecuteAsync<T>(request: Observable<T>): Promise<T> {
    return lastValueFrom(request);
  }

  protected async GetAsync<T>(path: string, params?: object): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.get<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}${params ? '?' + this.MapParams(params) : ''}`));
  }

  protected async PostAsync<T>(path: string, params?: object): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.post<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}`, params));
  }

  protected async PutAsync<T>(path: string, params?: object): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.put<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}`, params));
  }

  protected async DeleteAsync<T>(path: string, params?: object): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.delete<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}${params ? '?' + this.MapParams(params) : ''}`));
  }

  protected async PatchAsync<T>(path: string, params?: object): Promise<BaseResponse<T>> {
    return this.ExecuteAsync(this.http.patch<BaseResponse<T>>(`${this.url}${path ? '/' + path : ''}`, params));
  }

  protected MapParams(params: object) {
    const urlParams: string[] = [];
    Object.entries(params).map(([key, value]: [string, any]) => {
      if (value !== undefined && value !== null) {
        urlParams.push(this.MapSingleParam(value, key, false));
      }
    });
    return urlParams.join('&');
  }

  protected MapSingleParam<T>(value: T | T[], name: string, concated: boolean = true): string {
    if (value === undefined || value === null) {
      return '';
    }
    if (!Array.isArray(value)) {
      return `${concated ? '&' : ''}${name}=${value}`;
    }
    if (value.length > 0) {
      return (concated ? '&' : '') +
        value.map(x => `${name}=${x}`).reduce((acc, v) => `${acc}&${v}`);
    }
    return '';
  }
}
