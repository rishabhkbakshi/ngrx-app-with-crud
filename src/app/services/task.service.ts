import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseURL: string = 'http://localhost:3000/'

  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseURL + 'task')
  }

  addTask(task: Task): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task)
    return this.http.post(`${this.baseURL}task`, body, { headers })
  }

  updateTask(index: number, task: Task): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task)
    return this.http.put(`${this.baseURL}task/${index}`, body, { headers })
  }

  deleteTask(index: number): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.delete(`${this.baseURL}task/${index}`, { headers })
  }
}
