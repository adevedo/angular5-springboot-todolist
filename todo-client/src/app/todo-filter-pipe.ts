import {Pipe, PipeTransform} from '@angular/core';
import {TodoFilter} from './todo-filter';
import {Todo} from './todo';

@Pipe({
  name: 'todofilter',
  pure: false
})
export class TodoFilterPipe implements PipeTransform {
  transform(items: Todo[], filter: TodoFilter): Object[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: Todo) => this.applyFilter(item, filter));
  }

  applyFilter(todo: Todo, filter: TodoFilter): boolean {
    if (filter.status !== 'all' && todo.status !== 'new') {
      return false;
    }
    if (filter.messageLike !== '' && filter.messageLike != null) {
      return todo.message.toLowerCase().indexOf(filter.messageLike.toLowerCase()) !== -1;
    }
    return true;
  }
}
