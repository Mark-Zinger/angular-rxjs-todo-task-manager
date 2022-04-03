import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {map, Observable} from "rxjs";

export interface Task {
  id?: string;
  title: string;
  date: string;
}

interface CreateResponce {
  name: string
}

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = 'https://angular-rxjs-todo-task-manager-default-rtdb.firebaseio.com/tasks'

  constructor( private http: HttpClient ) {}

  load (date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Record<string, Task>>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map((tasks ) => {
        if(!tasks) return [];

        return Object.keys(tasks).map( key => ({...tasks[key], id: key}) )
      }))
  }

  create (task: Task): Observable<Task> {
    return this.http
      .post<CreateResponce>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map(responce  => {
        return {...task, id: responce.name}
      }))
  }

  remove (task: Task): Observable<void> {
    return this.http
      .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }
}
