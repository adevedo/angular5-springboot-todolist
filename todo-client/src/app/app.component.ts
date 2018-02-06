import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Todo} from './todo';
import {TodoFilter} from './todo-filter';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('newTodoText')
  newTodoText: ElementRef;

  todos: Todo[] = [];
  filter: TodoFilter = new TodoFilter();

  constructor(private http: HttpClient) {
  }
  ngAfterViewInit(): void {
    this.newTodoText.nativeElement.focus();
    const req = this.http.get('/api/todos/')
      .subscribe(
      res => {
        (res as Todo[]).forEach((todo, index) => {
          this.todos.push(todo);
        });
      },
      err => {
        console.log('Error occured');
      }
      );
  }
  addNewTodo(newTodoText): void {
    if (newTodoText != null && newTodoText !== '') {
      const todo: Todo = {
        message: newTodoText,
        status: 'new',
        createdOn: new Date(),
        updatedOn: new Date()
      };
      const req = this.http.post('/api/todos/', todo)
        .subscribe(
        res => {
          console.log(res);
          this.todos.push(res as Todo);
          newTodoText = '';
        },
        err => {
          console.log('Error occured');
        }
        );
    }
  }
  markCompleted(todo): void {
    todo.status = 'completed';
    todo.updatedOn = new Date();
    const req = this.http.put('/api/todos/' + todo.id, todo)
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
      );
  }
  markDeleted(todo): void {
    todo.status = 'deleted';
    todo.updatedOn = new Date();
    const req = this.http.put('/api/todos/' + todo.id, todo)
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
      );
  }
}
