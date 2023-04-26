import { makeAutoObservable } from 'mobx';
import { ITodo, TodoDto } from '../models/ITodo.interface';

import { TodoService } from '../services/TodoService';
import { TodoStore } from './todo';

class TodosStore {
  todos: ITodo[] = [];
  groupBy = 'none';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTodos(todos: TodoStore[]) {
    this.todos = todos;
  }
  setGroupBy(groupBy: string) {
    this.groupBy = groupBy;
  }

  private groupByProperty(key: keyof ITodo) {
    return function group(array: ITodo[]) {
      return array.reduce((acc, obj: ITodo) => {
        const property = obj[key];
        if (key === "finishDate") {
          const correntDay = Date.now();
          const oneDay = 24 * 60 * 60 * 1000;
          const taskDate = new Date(obj.finishDate).getTime()
          if (taskDate < correntDay + oneDay) {
            acc.today = acc.today || [];
            acc.today.push(obj);
          } else if (taskDate < correntDay + 7 * oneDay) {
            acc.week = acc.week || [];
            acc.week.push(obj);
          } else {
            acc.more = acc.more || [];
            acc.more.push(obj);
          }
        } else {
          acc[property] = acc[property] || [];
          acc[property].push(obj);
        }
        return acc;
      }, {} as { [key: string]: ITodo[] });
    };
  }

  get sortedTodos() {
    return [...this.todos].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  get groupedTodosByDate() {
    return this.groupByProperty('finishDate')([...this.todos]);
  }
  get groupedTodosByAssignee() {
    return this.groupByProperty('assignee')([...this.todos]);
  }

  async getTodos(id: string) {
    try {
      const response = await TodoService.getTodos(id);
      const { data } = response;
      this.setTodos(data.map((todo) => new TodoStore(todo)));
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(todo: TodoDto) {
    try {
      const response = await TodoService.addTodo(todo);
      const { data } = response;
      this.setTodos([...this.todos, new TodoStore(data)]); 
    }catch (error) {
      console.log(error);
    }
  }

  async updateTodo(todo: ITodo) {
    try {
      const response = await TodoService.updateTodo(todo);
      this.setTodos(this.todos.map((item) => item.id === todo.id ? new TodoStore(todo) : item));
    } catch (error) {
      console.log(error);
    }
  }
}

export const todosStore = new TodosStore();
