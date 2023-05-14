import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = '/api/products';
  
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url)
      .pipe(retry(2), 
        catchError(this.handleError))
  }
  
  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + '/' + id).pipe(retry(2), catchError(this.handleError))
  }

  saveProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.url, JSON.stringify(product), this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  updateUser(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(this.url + '/' + product.id, JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else{
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
