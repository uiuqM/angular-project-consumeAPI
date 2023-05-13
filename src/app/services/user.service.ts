import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '/api/users';
  
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.url)
      .pipe(retry(2), 
        catchError(this.handleError))
  }
  
  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(this.url + '/' + id).pipe(retry(2), catchError(this.handleError))
  }

  saveUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.url, JSON.stringify(user), this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(this.url + '/' + user.id, JSON.stringify(user), this.httpOptions)
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
